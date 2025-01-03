import { Image } from 'expo-image';
import React from 'react';
import { ReactNode } from 'react';
import { Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useSWR from 'swr';

import { Carousel } from '~/components/carousel';
import { ProductCard } from '~/components/product-card';
import { cn } from '~/lib/utils';

const carouselItemsData = [
  {
    image:
      'https://cf.shopee.vn/file/sg-11134258-7ra2j-m4ifjwcctitffd_xxhdpi',
    ar: 0.33,
  },
  {
    image:
      'https://cf.shopee.vn/file/sg-11134258-7ra3h-m4iqr1lmfbpg37_xxhdpi',
    ar: 0.33,
  },
  {
    image:
      'https://cf.shopee.vn/file/sg-11134258-7ra1n-m4in0iszcjf6e6_xxhdpi',
    ar: 0.33,
  },
  {
    image:
      'https://cf.shopee.vn/file/vn-11134258-7ras8-m4iwhxalml1j03_xxhdpi',
    ar: 0.33,
  },
  {
    image:
      'https://cf.shopee.vn/file/vn-11134258-7ras8-m4ft96aewlhr84_xxhdpi',
    ar: 0.33,
  },
  {
    image:
      'https://cf.shopee.vn/file/vn-11134258-7ras8-m4ft96aewlhr84_xxhdpi',
    ar: 0.33,
  },
] as const;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
}

export default function HomeScreen() {
  const { data, isLoading, error } = useSWR<any[]>('https://fakestoreapi.com/products', fetcher)
  const section = ({ start, end, title }: { start: number, end: number, title: ReactNode }) => (
    <View className='bg-white -mx-2 px-2 mb-4'>
      <View className=' flex flex-row items-center gap-2 py-2'>{title}</View>
      <View className="flex flex-row flex-wrap gap-2 pb-8">
        {isLoading || error ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCard key={i} id={i} />
          ))
        ) : (
          data?.slice(start, end).map((props, index) => (
            <ProductCard key={index} {...props} />
          ))
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className={cn(Platform.OS === "android" ? "pt-16" : "", "flex flex-1 flex-col")}>
      <ScrollView className='px-2 bg-zinc-200 space-y-4 z-0'>
        <View className="bg-white -mx-2 px-2 mb-4">
          <Text className="text-3xl font-bold text-center capitalize text-red-600">Sale kịch trần, Sắm tết vô lo</Text>
          <Carousel items={[...carouselItemsData]} />
        </View>

        {section({
          start: 0,
          end: 10,
          title: (
            <>
              <Text className="text-3xl font-bold text-red-600">Flash sale</Text>
              <Image
                placeholder={require('~/assets/fire-happy-64.png')}
                source={require('~/assets/fire-happy-64.png')}
                style={{ width: 32, height: 32 }}
              />
            </>
          )
        })}

        {section({
          start: 10,
          end: 20,
          title: (
            <>
              <Text className="text-3xl font-bold text-red-600">Gợi ý hôm nay</Text>
              <Image
                placeholder={require('~/assets/star-light-64.png')}
                source={require('~/assets/star-light-64.png')}
                style={{ width: 32, height: 32 }}
              />
            </>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
