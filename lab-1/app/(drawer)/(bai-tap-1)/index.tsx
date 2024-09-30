import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { generateRandomPost } from './function';

import { ThreadPost, ThreadPostSkeleton } from '~/components/bai-tap-1';
import { useColorScheme } from '~/lib/useColorScheme';

export default function BaiTap1Screen() {
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkColorScheme } = useColorScheme();
  const [data, setData] = useState<
    {
      _id: string;
      currentLikes: number;
      isLiked: boolean;
      currentComments: number;
      currentReposts: number;
      isReposted: boolean;
      content: string;
      name: string;
      userImg: string;
      image?: {
        uri: string;
        width: number;
        height: number;
      };
    }[]
  >([]);

  useEffect(() => {
    setTimeout(() => {
      return setData(Array.from({ length: 6 }, (_, index) => generateRandomPost(index + 1)));
    }, 1000);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setData([]);
    setTimeout(() => {
      setData(Array.from({ length: 6 }, (_, index) => generateRandomPost(index + 1)));
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ThreadPost {...item} />}
      ListEmptyComponent={ThreadPostSkeleton}
      keyExtractor={(item) => item._id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={isDarkColorScheme ? ['#fff'] : ['#000']}
          tintColor={isDarkColorScheme ? '#fff' : '#000'}
        />
      }
    />
  );
}
