import { ScrollView, View } from 'react-native';
import useSWR from 'swr';

import PlaceItem from '~/components/place-item';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { Text } from '~/components/ui/text';
import { supabase } from '~/utils/supabase';

const fetcher = async () => {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

const signOut = async () => {
  supabase.auth.signOut();
};

export default function MyPlace() {
  const { data, isLoading, error } = useSWR('places', fetcher);

  return (
    <ScrollView>
      <View className='flex gap-4 p-4'>
        {isLoading || error
          ? Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className='aspect-[3_/_1] w-full' />
            ))
          : data?.map((place) => <PlaceItem key={place.id} {...place} />)}
        <Button onPress={signOut}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
