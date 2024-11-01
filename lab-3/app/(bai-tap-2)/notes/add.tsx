import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { toast } from 'sonner-native';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import { Container } from '~/components/container';
import { Form, FormController } from '~/components/customize-ui/form';
import { Input } from '~/components/customize-ui/input';
import { StateButton } from '~/components/customize-ui/state-button';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { Tables } from '~/database.types';
import { addNote } from '~/lib/data-handler';
import { DEFAULT_NOTE_FORM_VALUES, noteFormSchema } from '~/utils/form/note';

export default function AddNoteScreen() {
  const { mutate } = useSWRConfig();

  const form = useForm<z.infer<typeof noteFormSchema>>({
    defaultValues: DEFAULT_NOTE_FORM_VALUES,
    resolver: zodResolver(noteFormSchema),
  });

  const onSubmit = useCallback(async (data: z.infer<typeof noteFormSchema>) => {
    try {
      const returnData = await addNote(data);
      await mutate('notes', (prev: (Tables<'notes'> | null)[] | undefined) => {
        // If prev is undefined, initialize it as an empty array
        const currentData = prev || [];
        return [returnData, ...currentData];
      });
      toast.success('Add notes successful!!!');
      router.back();
    } catch (error: any) {
      const message = error?.message || 'Unknown Error';
      console.error(message);
      toast.error(message);
    }
  }, []);

  return (
    <Container>
      <Form {...form}>
        <FormController
          name="title"
          label="Title:"
          render={({ field }) => (
            <Input placeholder="Enter label" returnKeyType="next" {...field} />
          )}
        />

        <FormController
          name="content"
          label="Content:"
          render={({ field }) => (
            <Textarea placeholder="Enter your content" returnKeyType="next" {...field} />
          )}
        />
      </Form>

      <StateButton
        onPress={form.handleSubmit(async (data) => {
          Keyboard.dismiss();
          await onSubmit(data);
        })}>
        <Text>Submit</Text>
      </StateButton>
    </Container>
  );
}
