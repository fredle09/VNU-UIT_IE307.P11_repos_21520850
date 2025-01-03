import React from 'react';
import { Stack, useLocalSearchParams } from "expo-router";
import useSWR, { useSWRConfig } from "swr";
import { Text } from "~/components/ui/text";
import { SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { View } from 'react-native';
import { Star } from '~/lib/icons/Star';
import NotFoundScreen from '~/app/+not-found';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const { cache } = useSWRConfig();
  const cacheData = cache.get("https://fakestoreapi.com/products")?.data as IProductCardProps[];
  const cacheProductData = cacheData?.find((item) => item.id === Number(id));
  const { data, isLoading, error } = useSWR(
    !cacheProductData
      ? `https://fakestoreapi.com/products/${id}`
      : null,
    fetcher);

  const finalData = { ...(data ?? {}), ...cacheProductData };

  if (!!error || JSON.stringify(finalData) === "{}")
    return NotFoundScreen();

  return (
    <SafeAreaView className="flex-1">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Stack.Screen options={{
            title: (data || cacheProductData)?.title || "Product Detail",
            headerShown: true,
          }} />
          <ScrollView className='flex flex-1 flex-col gap-4 space-y-4 p-4 pb-16'>
            <Image
              source={finalData.image}
              contentFit="contain"
              style={{ aspectRatio: 1 }}
            />
            <Text className='text-xl font-bold'>{finalData.title}</Text>
            <Text>{finalData.description}</Text>
            <Text className='text-xl font-bold'>Price: ${finalData.price}</Text>
            <View className="flex flex-row gap-2 items-center">
              <Text className="font-bold text-base">Rating:</Text>
              <Star className='size-6 text-yellow-500' />
              <Text className="text-yellow-500">{finalData?.rating?.rate} ({finalData?.rating?.count})</Text>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  )
};
