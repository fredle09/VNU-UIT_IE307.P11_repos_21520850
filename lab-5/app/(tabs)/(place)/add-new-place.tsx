import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { z } from 'zod';

import { CoordinatesInput } from '~/components/customize-ui/coordinates-input';
import { Form, FormController } from '~/components/customize-ui/form';
import { ImageInput } from '~/components/customize-ui/image-input';
import { Input } from '~/components/customize-ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { User } from '~/lib/icons/User';
import { uploadFileFromUri } from '~/lib/storage';
import {
  addNewPlaceFormSchema,
  DEFAULT_ADD_NEW_PLACE_FORM_VALUES,
} from '~/utils/form/add-new-place';

export default function AddMyPlace() {
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const form = useForm<z.infer<typeof addNewPlaceFormSchema>>({
    defaultValues: DEFAULT_ADD_NEW_PLACE_FORM_VALUES,
    resolver: zodResolver(addNewPlaceFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof addNewPlaceFormSchema>) => {
    setIsLoading(true);
    try {
      const _data = await uploadFileFromUri('places', `${data.title}.jpg`, data.imageUri);
      console.log('🚀 ~ onSubmit ~ _data:', _data);
    } finally {
      setIsLoading(false);
    }
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
            name='coordinates'
            label='Coordinates:'
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
