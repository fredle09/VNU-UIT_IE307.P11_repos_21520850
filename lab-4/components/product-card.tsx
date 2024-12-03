import { Image, View } from 'react-native';

import { Text } from './ui/text';

interface IProductCardProps { imgUri?: string; name?: string; description?: string }

const PRODUCT_CARD_DEFAULT_PROPS = {
  imgUri: 'https://images.unsplash.com/photo-1685725083464-26cab8f2da1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  name: 'Product Name',
}

export const ProductCard = (props?: IProductCardProps) => {
  props = Object.assign(PRODUCT_CARD_DEFAULT_PROPS, props);

  return (
    <View className="w-full min-w-48 flex-1">
      <View className="overflow-hidden">
        <View className="aspect-[3/4] w-full flex-1 overflow-hidden rounded">
          <Image
            defaultSource={require('~/assets/icon.png')}
            source={{ uri: props.imgUri }}
            className="aspect-[3/4] object-cover"
          />
        </View>
        <View className="py-2">
          <Text className="text-xl font-bold">{props.name}</Text>
          <Text>{props.description}</Text>
        </View>
      </View>
    </View>
  );
};
