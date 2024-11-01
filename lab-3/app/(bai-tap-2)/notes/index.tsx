import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import useSWR, { Fetcher } from 'swr';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Text } from '~/components/ui/text';
import { Database, Tables } from '~/database.types';
import { getNotes } from '~/lib/data-handler';
import { Pencil } from '~/lib/icons/Pencil';
import { useColorScheme } from '~/lib/useColorScheme';

const fetcher: Fetcher<Tables<'notes'>[], keyof Database['public']['Tables']> = async (table) => {
  return await getNotes();
};

export default function NotesIndexScreen() {
  const { data, isLoading, error, mutate } = useSWR('notes', fetcher);
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkColorScheme } = useColorScheme();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await mutate(); // Re-fetch data using SWR
    setRefreshing(false);
  }, []);

  return (
    <FlatList
      className="p-6"
      data={data}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={isDarkColorScheme ? ['#fff'] : ['#000']}
          tintColor={isDarkColorScheme ? '#fff' : '#000'}
        />
      }
      ListEmptyComponent={
        refreshing || isLoading || error ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="mb-4 min-h-32 w-full" />
            ))}
          </>
        ) : (
          <Text className="text-center">No notes found!</Text>
        )
      }
      renderItem={({ item }) => (
        <Card className="mb-4">
          <View className="flex flex-row items-center justify-between pr-3">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <Button
              size="icon"
              variant="ghost"
              onPress={() => router.push(`/(bai-tap-2)/notes/edit?id=${item.id}`)}>
              <Pencil className="text-black dark:text-white" />
            </Button>
          </View>
          <CardContent>
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis">
              {item.content}
            </Text>
          </CardContent>
        </Card>
      )}
    />
  );
}
