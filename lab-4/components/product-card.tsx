import React from 'react';
import { Image, View } from 'react-native';

import { Text } from './ui/text';

export const ProductCard = (props?: { imgUri?: string; name?: string; description?: string }) => {
  const {
    imgUri = 'https://images.unsplash.com/photo-1685725083464-26cab8f2da1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name = 'Product Name',
    // description = 'Product Description',
  } = props || {};
  return (
    <View className="w-full min-w-48 flex-1">
      <View className="overflow-hidden">
        <View className="aspect-[3/4] w-full flex-1 overflow-hidden rounded">
          <Image
            defaultSource={require('~/assets/splash.png')}
            source={{ uri: imgUri }}
            className="aspect-[3/4] object-cover"
          />
        </View>
        <View className="py-2">
          <Text className="text-xl font-bold">{name}</Text>
          {/* <Text>{description}</Text> */}
        </View>
      </View>
    </View>
  );
};
