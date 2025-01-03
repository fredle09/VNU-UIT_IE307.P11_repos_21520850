import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { useSWRConfig } from 'swr';
import { CartItem } from '~/components/cart-item';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { useCartContext } from '~/providers/cart-provider';
import { Button } from "~/components/ui/button";
import { router } from 'expo-router';

export default function BaiTap3FavoritesScreen() {
  const { cart } = useCartContext();
  const { cache } = useSWRConfig();
  const cacheData = cache.get("https://fakestoreapi.com/products")?.data as any[] | undefined;
  const data = cart.map(({ product_id, quantity }) => ({
    ...(cacheData?.find((item) => item.id === product_id) ?? {}),
    quantity,
  }));

  return (
    <SafeAreaView className={cn(Platform.OS === "android" ? "mt-16" : "", "flex flex-1 flex-col pb-20")}>
      {data.length > 0 ? (
        <ScrollView className='px-4 space-y-4 z-0 bg-white'>
          {data.map((item, i) => (
            <CartItem key={i} {...item} />
          ))}
          {Platform.OS === "ios" && <View className="h-16" />}
        </ScrollView>
      ) : (
        <View className='flex flex-1 justify-center items-center h-full'>
          <Text>No products in the cart</Text>
          <Button size="sm" onPress={() => { router.push("/(main)/home"); }}>
            <Text>Shopping Now</Text>
          </Button>
        </View>
      )}
      {data.length > 0 && (
        <View className='absolute bottom-0 p-4 w-full h-16 border-t-2 border-zinc-50 flex flex-row justify-between items-center bg-white'>
          <Text>Total: ${data.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</Text>
          <Button size="sm" disabled={!data.length} onPress={() => { }}>
            <Text>Checkout</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
