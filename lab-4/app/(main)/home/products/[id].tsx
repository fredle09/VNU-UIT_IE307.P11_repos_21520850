import React from 'react';
import { Stack, useLocalSearchParams } from "expo-router";
import useSWR, { useSWRConfig } from "swr";
import { Text } from "~/components/ui/text";
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { View } from 'react-native';

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

  const finalData = { ...data, ...cacheProductData };

  return (
    <>
      <Stack.Screen options={{
        title: (data || cacheProductData)?.title || "Product Detail",
        headerShown: true,
        headerStyle: {
          backgroundColor: 'white',
        }
      }} />
      <ScrollView className='flex flex-1 p-4'>
        {error && <Text>Error: {error.message}</Text>}
        {isLoading && <Text>Loading...</Text>}
        {finalData && (
          <View className='flex flex-col gap-4'>
            <Image source={finalData.image} style={{ aspectRatio: 1 }} />
            <Text className='text-xl font-bold'>{finalData.title}</Text>
            <Text>{finalData.description}</Text>
            <Text className='text-xl font-bold'>${finalData.price}</Text>
          </View>
        )}
      </ScrollView>
    </>
  )
};
