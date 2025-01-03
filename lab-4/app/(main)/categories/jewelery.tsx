import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import useSWR from 'swr';
import { ProductCard } from '~/components/product-card';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
}

export default function BaiTap3Category1Screen() {
  const { data, isLoading, error } = useSWR<any[]>('https://fakestoreapi.com/products/category/jewelery', fetcher)

  return (
    <SafeAreaView className="flex flex-1 flex-col">
      <ScrollView className='px-2 space-y-4 z-0 bg-white'>
        <View className='bg-white -mx-2 px-2 mb-4'>
          <View className="flex flex-row flex-wrap gap-2 pb-8">
            {isLoading || error ? (
              Array.from({ length: 4 }).map((_, i) => (
                <ProductCard key={i} id={i} />
              ))
            ) : (
              data?.map((props, index) => (
                <ProductCard key={index} {...props} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
