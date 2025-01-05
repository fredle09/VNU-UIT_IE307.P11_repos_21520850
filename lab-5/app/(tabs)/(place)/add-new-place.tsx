import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { z } from 'zod';

import { Form, FormController } from '~/components/customize-ui/form';
import { ImageInput } from '~/components/customize-ui/image-input';
import { Input } from '~/components/customize-ui/input';
import { User } from '~/lib/icons/User';
import {
  addNewPlaceFormSchema,
  DEFAULT_ADD_NEW_PLACE_FORM_VALUES,
} from '~/utils/form/add-new-place';

export default function AddMyPlace() {
  const form = useForm<z.infer<typeof addNewPlaceFormSchema>>({
    defaultValues: DEFAULT_ADD_NEW_PLACE_FORM_VALUES,
    resolver: zodResolver(addNewPlaceFormSchema),
  });

  return (
    <ScrollView className='p-4'>
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
          render={({ field }) => <ImageInput {...field} />}
        />
      </Form>
    </ScrollView>
  );
}
