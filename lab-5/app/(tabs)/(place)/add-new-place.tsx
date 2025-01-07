import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { toast } from 'sonner-native';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import { CoordinatesInput } from '~/components/customize-ui/coordinates-input';
import { Form, FormController } from '~/components/customize-ui/form';
import { ImageInput } from '~/components/customize-ui/image-input';
import { Input } from '~/components/customize-ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { User } from '~/lib/icons/User';
import { getPublicUrl, uploadFileFromUri } from '~/lib/storage';
import { useAuthSession } from '~/providers/auth-provider';
import {
  addNewPlaceFormSchema,
  DEFAULT_ADD_NEW_PLACE_FORM_VALUES,
} from '~/utils/form/add-new-place';
import { unicodeToAscii } from '~/utils/functions';
import { supabase } from '~/utils/supabase';

export default function AddMyPlace() {
  const { session } = useAuthSession();
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const form = useForm<z.infer<typeof addNewPlaceFormSchema>>({
    defaultValues: DEFAULT_ADD_NEW_PLACE_FORM_VALUES,
    resolver: zodResolver(addNewPlaceFormSchema),
  });
  const { mutate } = useSWRConfig();

  const insertPlace = useCallback(
    async ({ locate, ...data }: z.infer<typeof addNewPlaceFormSchema>) => {
      try {
        setIsLoading(true);
        if (!session?.user?.id) return;
        const _data = await uploadFileFromUri(
          'places',
          `${unicodeToAscii(data.title)}.${new Date().getTime()}.jpg`,
          data.imageUri
        );
        const fullPath = getPublicUrl('places', _data.path);
        const { error } = await supabase
          .from('places')
          .insert({ ...data, imageUri: fullPath, user_id: session.user.id, ...locate });
        if (error) throw error;
        mutate('places');
        router.back();
      } finally {
        setIsLoading(false);
      }
    },
    [session]
  );

  const onSubmit = async ({ locate, ...data }: z.infer<typeof addNewPlaceFormSchema>) => {
    if (!session?.user?.id) return;
    toast.promise(insertPlace({ locate, ...data }), {
      loading: 'Adding new place...',
      success: () => 'New place added successfully',
      error: 'Failed to add new place',
    });
  };

  return (
    <ScrollView ref={scrollViewRef}>
      <View className='p-4'>
        <Form {...form}>
          <FormController
            name='title'
            label='Title:'
            render={({ field }) => (
              <Input
                childLeft={<User className='ml-1 size-6 text-zinc-500' />}
                autoCapitalize='words'
                placeholder='The title of the place'
                {...field}
              />
            )}
          />

          <FormController
            name='imageUri'
            label='Image:'
            render={({ field }) => <ImageInput {...field} disabled={isLoading} />}
          />

          <FormController
            name='locate'
            label='Locate:'
            render={({ field }) => (
              <CoordinatesInput
                value={field.value}
                onChange={field.onChangeText}
                disabled={isLoading}
                scrollViewRef={scrollViewRef}
              />
            )}
          />

          <Button onPress={form.handleSubmit(onSubmit)} className='mt-4' disabled={isLoading}>
            <Text>Add New Place</Text>
          </Button>
        </Form>
      </View>
    </ScrollView>
  );
}
