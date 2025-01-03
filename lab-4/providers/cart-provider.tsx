import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "~/utils/supabase";
import { useAuthSession } from "./auth-provider";
import { toast } from "sonner-native";

type TProduct = { id: number }
type TCartProduct = {
  product_id: number;
  quantity: number;
};

const CartContext = createContext<{
  cart: TCartProduct[],
  addProductToCart: (product: TProduct) => void;
} | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const { session } = useAuthSession();
  const [cart, setCart] = useState<TCartProduct[]>([]);

  const checkExists = useCallback((product: TProduct, cart: TCartProduct[]) => {
    return cart.some((item) => item.product_id === product.id);
  }, []);

  const addProductToCart = useCallback(async (product: TProduct) => {
    const user_id = session?.user.id;
    if (!user_id) return;

    const promise = async () => {
      const { data, error } = await supabase
        .from('carts')
        .select("quantity")
        .eq('user_id', user_id)
        .eq('product_id', product.id);

      if (error) {
        console.error("🚀 ~ addProductToCart ~ error:", error)
        return;
      }

      if (!data) return;

      if (!data?.length) {
        const { error } = await supabase
          .from('carts')
          .insert({ user_id, product_id: product.id, quantity: 1 });

        if (error) {
          console.error("🚀 ~ addProductToCart ~ error:", error)
          return;
        }

        return { data: 1 };
      } else {
        const newQuantity = (data[0].quantity ?? 0) + 1;
        const { error } = await supabase
          .from('carts')
          .update({ quantity: newQuantity })
          .eq('user_id', user_id)
          .eq('product_id', product.id);


        if (error) {
          console.error("🚀 ~ addProductToCart ~ error:", error)
          return;
        }

        return { data: newQuantity };
      }
    }

    toast.promise(promise(), {
      loading: "Loading...",
      success: (data) => data === 1
        ? "Add product to cart successfully"
        : "Update the quantity in cart increased successfully",
      error: "Add product to cart failed"
    })


    setCart(prev => {
      if (checkExists(product, prev))
        return prev.map((item) =>
          item.product_id === product.id
            ? ({ product_id: product.id, quantity: item.quantity ?? 1 })
            : item);
      return [...prev, { product_id: product.id, quantity: 1 }];
    });
  }, [checkExists, setCart, session, toast]);

  useEffect(() => {
    const fetchCart = async () => {
      const user_id = session?.user.id;
      if (!user_id) return;

      const { data, error } = await supabase
        .from('carts')
        .select("product_id, quantity")
        .eq('user_id', user_id);

      if (error) {
        console.error("🚀 ~ fetchCart ~ error:", error);
        return;
      }

      if (!data.length) return;

      setCart(data.map(({ product_id, quantity }) => ({
        product_id: product_id ?? 0,
        quantity: quantity ?? 1
      })));
    };

    fetchCart();
  }, [session]);

  return (
    <CartContext.Provider value={{ cart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
}