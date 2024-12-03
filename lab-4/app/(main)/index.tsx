import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Carousel } from '~/components/carousel';
import { ProductCard } from '~/components/product-card';

const carouselItemsData = [
  {
    image:
      'https://images.unsplash.com/photo-1678436748951-ef6d381e7a25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8YWV1NnJMLWo2ZXd8fGVufDB8fHx8fA%3D%3D',
    ar: 0.7,
  },
  {
    image:
      'https://images.unsplash.com/photo-1680813977591-5518e78445a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ar: 0.67,
  },
  {
    image:
      'https://images.unsplash.com/photo-1679508056887-5c76269dad54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ar: 0.8,
  },
  {
    image:
      'https://images.unsplash.com/photo-1681243303374-72d01f749dfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDczfGFldTZyTC1qNmV3fHxlbnwwfHx8fHw%3D',
    ar: 0.68,
  },
  {
    image:
      'https://images.unsplash.com/photo-1675185741953-18b60234cb79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ar: 0.67,
  },
  {
    image:
      'https://images.unsplash.com/photo-1685725083464-26cab8f2da1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ar: 0.67,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex flex-1 flex-col">
      <ScrollView>
        <Text className="text-3xl font-bold">Hehe</Text>
        <Carousel items={carouselItemsData} />

        <View className="flex flex-row flex-wrap gap-2 px-2">
          {Array.from({ length: 8 }).map((__props, index) => (
            <ProductCard key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
