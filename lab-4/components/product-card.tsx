import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';

import { Text } from './ui/text';
import { StyleSheet } from 'react-native';
import { Star } from '~/lib/icons/Star';
import { ShoppingCart } from '~/lib/icons/ShoppingCart';
import { Button } from './ui/button';
import { useCartContext } from '~/providers/cart-provider';
import { router } from 'expo-router';

const PRODUCT_CARD_DEFAULT_PROPS: Partial<IProductCardProps> = {
  title: 'Product Name',
  image: 'https://images.unsplash.com/photo-1685725083464-26cab8f2da1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
} as const;

export const ProductCard = (props: Partial<Omit<IProductCardProps, "id">> & { id: number }) => {
  props = Object.assign({}, PRODUCT_CARD_DEFAULT_PROPS, props);
  const { addProductToCart } = useCartContext();

  return (
    <Pressable className="w-full min-w-48 flex-1" onPress={() => router.push({
      pathname: '/(main)/home/products/[id]',
      params: { id: props.id }
    })}>
      <View>
        <View className="overflow-hidden">
          <View className="aspect-[3/4] w-full flex-1 overflow-hidden rounded">
            <Image
              contentFit="contain"
              placeholder={require('~/assets/icon.png')}
              source={{ uri: props.image }}
              style={styles.productImage}
            />
          </View>
          <View className="flex flex-1">
            <Text className="text-base font-bold line-clamp-2">{props.title}</Text>
            <View className='flex flex-row gap-2 items-center justify-between'>
              <View className="flex flex-col w-full justify-between flex-1">
                <Text className="text-xl text-orange-500">${props.price}</Text>
                {props.rating && (
                  <View className='flex flex-row items-center gap-2'>
                    <Star className='size-6 text-yellow-500' />
                    <Text className="text-yellow-500">{props?.rating?.rate} ({props?.rating?.count})</Text>
                  </View>
                )}
              </View>
              <Button variant="ghost" size="icon" onPress={() => addProductToCart({ id: props.id })}>
                <ShoppingCart className="text-black" />
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  productImage: { aspectRatio: 3 / 4 }
})