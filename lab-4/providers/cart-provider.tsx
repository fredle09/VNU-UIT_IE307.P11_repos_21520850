import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "~/utils/supabase";
import { useAuthSession } from "./auth-provider";
import { toast } from "sonner-native";
import { useDebouncedCallback } from "use-debounce";

type TProduct = { id: number };
type TCartProduct = {
  product_id: number;
  quantity: number;
};

const CartContext = createContext<{
  cart: TCartProduct[];
  addProductToCart: (product: TProduct) => void;
  removeProductFromCart: (product: TProduct) => void;
  increasedQuantity: (product: TProduct) => void;
  decreasedQuantity: (product: TProduct) => void;
} | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const { session } = useAuthSession();
  const [cart, setCart] = useState<TCartProduct[]>([]);

  const debouncedSyncCart = useDebouncedCallback(async (cart: TCartProduct[]) => {
    const user_id = session?.user.id;
    if (!user_id) return;

    const { error } = await supabase
      .from("carts")
      .upsert(cart.map(item => ({ user_id, product_id: item.product_id, quantity: item.quantity })));

    if (error) {
      console.error("🚀 ~ debouncedSyncCart ~ error:", error);
    }
  }, 1000);

  const checkExists = useCallback((product: TProduct, cart: TCartProduct[]) => {
    return cart.some(item => item.product_id === product.id);
  }, []);

  const addProductToCart = useCallback(
    (product: TProduct) => {
      setCart(prev => {
        const updatedCart = checkExists(product, prev)
          ? prev.map(item =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
          : [...prev, { product_id: product.id, quantity: 1 }];

        debouncedSyncCart(updatedCart);
        return updatedCart;
      });
    },
    [checkExists, debouncedSyncCart]
  );

  const removeProductFromCart = useCallback(
    async (product: TProduct) => {
      if (!session?.user.id) {
        setCart([]);
        return;
      }

      const promise = async () => {
        const { error } = await supabase
          .from("carts")
          .delete()
          .eq("user_id", session?.user.id)
          .eq("product_id", product.id);

        if (error) {
          console.error("🚀 ~ removeProductFromCart ~ error:", error);
          return;
        }

        setCart(prev => prev.filter(item => item.product_id !== product.id));
      }

      toast.promise(promise(), {
        loading: "Deleting...",
        success: () => "Deleted successfully",
        error: "Failed to delete",
      });
    },
    [session, setCart, debouncedSyncCart]
  );

  const increasedQuantity = useCallback(
    (product: TProduct) => {
      setCart(prev => {
        const updatedCart = prev.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        debouncedSyncCart(updatedCart);
        return updatedCart;
      });
    },
    [debouncedSyncCart]
  );

  const decreasedQuantity = useCallback(
    (product: TProduct) => {
      setCart(prev => {
        const updatedCart = prev
          .map(item =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0);
        debouncedSyncCart(updatedCart);
        return updatedCart;
      });
    },
    [debouncedSyncCart]
  );

  useEffect(() => {
    const fetchCart = async () => {
      const user_id = session?.user.id;
      if (!user_id) {
        setCart([]);
        return;
      }

      const { data, error } = await supabase
        .from("carts")
        .select("product_id, quantity")
        .eq("user_id", user_id);

      if (error) {
        console.error("🚀 ~ fetchCart ~ error:", error);
        return;
      }

      if (data) {
        setCart(data.map(({ product_id, quantity }) => ({
          product_id: product_id ?? 0,
          quantity: quantity ?? 1,
        })));
      }
    };

    fetchCart();
  }, [session]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        increasedQuantity,
        decreasedQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
