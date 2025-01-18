import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import useSWR, { useSWRConfig } from 'swr';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Locate } from '~/lib/icons/Locate';
import { Trash2 } from '~/lib/icons/Trash2';
import { getPublicUrl } from '~/lib/storage';
import { capitalizeFirstChar } from '~/utils/functions';
import { supabase } from '~/utils/supabase';

const fetcher = async (url: string) => {
  const id = url.split('/').pop();
  const { data, error } = await supabase.from('places').select().eq('id', id!).single();
  if (error) throw error;
  return data;
};

export default function DetailItem() {
  const { id } = useLocalSearchParams();
  const { mutate } = useSWRConfig();
  const { cache } = useSWRConfig();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const cacheData = cache.get('places')?.data.find((place: any) => place.id === id);
  const { data, isLoading, error } = useSWR(cacheData ? null : `/places/${id as string}`, fetcher);
  const finalData = cacheData || data;

  const removePlace = async () => {
    setIsPending(true);
    try {
      const [{ error: errorPlace }, { error: errorStorage }] = await Promise.all([
        supabase.from('places').delete().eq('id', id),
        supabase.storage.from('places').remove([finalData.imageUri]),
      ]);
      if (errorPlace || errorStorage) {
        console.error(errorPlace || errorStorage);
        return;
      }

      mutate('places');
      router.back();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: capitalizeFirstChar(finalData?.title ?? 'Loading...'),
          headerRight: () => (
            <Button
              variant='destructive'
              size='icon'
              onPressIn={() => setIsAlertOpen(true)}
              disabled={isLoading}>
              <Trash2 className='size-6 text-white' />
            </Button>
          ),
        }}
      />
      <>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to remove?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will remove the place out of database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction onPress={removePlace}>
                <Text className='text-white'>Continue</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {isLoading || error ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Image
              source={{ uri: getPublicUrl('places', finalData.imageUri!) }}
              resizeMode='contain'
              className='aspect-[4_/_3] w-full'
            />
            <View className='flex gap-4 p-4'>
              <Text className='text-center text-2xl font-bold'>{finalData.address}</Text>
              <Button
                className='flex flex-row gap-2'
                disabled={isPending}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(place)/view-on-map',
                    params: {
                      lat: finalData.coordinates[0],
                      long: finalData.coordinates[1],
                      address: finalData.address,
                    },
                  })
                }>
                <Locate className='-ml-1.5 size-6 text-white dark:text-black' />
                <Text>View on Map</Text>
              </Button>
            </View>
          </>
        )}
      </>
    </>
  );
}
