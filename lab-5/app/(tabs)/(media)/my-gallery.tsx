import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect } from 'expo-router';
import { FlatList, View } from 'react-native';
import useSWR from 'swr';

import { MediaPreview } from '~/components/media-preview';
import { Skeleton } from '~/components/ui/skeleton';
import { Text } from '~/components/ui/text';

const fetcher = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') throw new Error('Permission denied');
  const payload = await MediaLibrary.getAssetsAsync({ mediaType: ['photo', 'video'] });
  return payload.assets;
};

const renderItem = ({ item }: { item: MediaLibrary.Asset }) => (
  <View className='w-1/2 p-1'>
    <MediaPreview
      uri={item.uri}
      type={item.mediaType as 'photo' | 'video'}
      className='aspect-square w-full overflow-hidden rounded-lg'
    />
  </View>
);

export default function MyGallery() {
  const { data, isLoading, error, mutate } = useSWR('medias', fetcher);

  useFocusEffect(() => {
    mutate();
  });

  return (
    <View className='flex flex-1 p-3'>
      {error ? (
        <View className='flex flex-1 items-center justify-center'>
          <Text>Error: {error.message}</Text>
        </View>
      ) : isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={() => (
            <View className='w-1/2 p-1'>
              <Skeleton className='aspect-square w-full rounded-lg' />
            </View>
          )}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
        />
      ) : (
        <FlatList
          data={data ?? []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )}
    </View>
  );
}
