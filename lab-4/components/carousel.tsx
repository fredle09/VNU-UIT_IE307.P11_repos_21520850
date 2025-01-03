import { useCallback } from 'react';
import { Dimensions, Image, View } from 'react-native';

import RNRCarousel from 'react-native-reanimated-carousel';
import { cn } from '~/lib/utils';

// Types and Interfaces
interface ICarouselItem {
  image: string;
  ar?: number; // aspect ratio
}

interface ICarouselProps {
  items: ICarouselItem[];
  renderItem?: ({
    item,
    index,
  }: {
    item: ICarouselItem;
    index: number;
  }) => React.ReactNode | undefined;
  aspectRatioClassname?: string;
}

const DEFAULT_SPACING = 16;
const DEFAULT_CARD_WIDTH = Dimensions.get('window').width - DEFAULT_SPACING;

export const Carousel = ({ items, aspectRatioClassname }: ICarouselProps) => {
  const DefaultCarouselItem = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <View
        key={item.id || index}
        className={cn(aspectRatioClassname ?? "aspect-[10/3]", "overflow-hidden rounded")}
        style={{
          width: DEFAULT_CARD_WIDTH,
          marginLeft: DEFAULT_SPACING / 2,
          marginRight: DEFAULT_SPACING / 2,
        }}>
        <Image
          defaultSource={require('~/assets/icon.png')}
          source={{ uri: item.image }}
          className={cn(aspectRatioClassname ?? "aspect-[10/3]", "w-full object-cover")}
        />
      </View>
    );
  }, [aspectRatioClassname]);

  return (
    <View className={cn(aspectRatioClassname ?? "aspect-[10/3]", "-mx-2")}>
      <RNRCarousel
        data={items}
        width={DEFAULT_CARD_WIDTH + DEFAULT_SPACING}
        renderItem={DefaultCarouselItem}
        loop
        autoPlay
        autoPlayInterval={2000}
      />
    </View>
  );
};
