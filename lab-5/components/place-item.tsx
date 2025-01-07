import { Image, View } from 'react-native';

import { Text } from './ui/text';

import { capitalizeFirstChar } from '~/utils/functions';

export interface IPlaceItemProps {
  title: string | null;
  imageUri: string | null;
  address: string | null;
}

export default function PlaceItem(props: IPlaceItemProps) {
  return (
    <View className='flex flex-row overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800'>
      <Image
        source={{ uri: props.imageUri ?? 'https://placehold.co/100x100' }}
        className='aspect-square w-1/3 object-contain'
      />
      <View className='flex w-2/3 flex-col gap-2 p-2 px-3'>
        <Text className='line-clamp-1 text-lg font-bold'>
          {capitalizeFirstChar(props.title ?? 'Unknown title')}
        </Text>
        <Text className='line-clamp-2'>{props.address}</Text>
      </View>
    </View>
  );
}