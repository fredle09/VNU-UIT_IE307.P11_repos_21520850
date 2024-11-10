import { View, Image, Dimensions } from 'react-native';
import RNRCarousel from 'react-native-reanimated-carousel'; // Import the snap carousel

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
}

const DEFAULT_SPACING = 16;
const DEFAULT_CARD_WIDTH = Dimensions.get('window').width - DEFAULT_SPACING;

const DefaultCarouselItem = ({ item, index }: { item: any; index: number }) => {
  return (
    <View
      key={item.id || index}
      className="aspect-video overflow-hidden rounded"
      style={{
        width: DEFAULT_CARD_WIDTH,
        marginLeft: DEFAULT_SPACING / 2,
        marginRight: DEFAULT_SPACING / 2,
      }}>
      <Image
        defaultSource={require('~/assets/splash.png')}
        source={{ uri: item.image }}
        className="aspect-video w-full object-cover"
      />
    </View>
  );
};

export const Carousel = ({ items, renderItem }: ICarouselProps) => {
  return (
    <View className="aspect-video">
      <RNRCarousel
        data={items}
        width={DEFAULT_CARD_WIDTH + DEFAULT_SPACING} // Add width property
        renderItem={DefaultCarouselItem}
        loop // Enable infinite loop
      />
    </View>
  );
};
