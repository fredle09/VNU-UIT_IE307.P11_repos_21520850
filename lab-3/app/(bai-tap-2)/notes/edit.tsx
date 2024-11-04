import { zodResolver } from '@hookform/resolvers/zod';
import { router, useGlobalSearchParams } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { toast } from 'sonner-native';
import useSWR, { Fetcher, useSWRConfig } from 'swr';
import { z } from 'zod';

import NotFoundScreen from '~/app/+not-found';
import { Container } from '~/components/container';
import { Form, FormController } from '~/components/customize-ui/form';
import { Input } from '~/components/customize-ui/input';
import { StateButton } from '~/components/customize-ui/state-button';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { Database, Tables } from '~/database.types';
import { editNote, getNote } from '~/lib/data-handler';
import { DEFAULT_NOTE_FORM_VALUES, noteFormSchema } from '~/utils/form/note';

const fetcher: Fetcher<
  Tables<'notes'> | null,
  [keyof Database['public']['Tables'], string]
> = async ([, id]) => await getNote(id);

export default function EditNoteScreen() {
  const { id: idRaw } = useGlobalSearchParams();
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;

  const {
    data: fetchedData,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? ['notes', id] : null, fetcher, {});
  const form = useForm<z.infer<typeof noteFormSchema>>({
    defaultValues: DEFAULT_NOTE_FORM_VALUES,
    resolver: zodResolver(noteFormSchema),
  });

  const { mutate: globalMutate } = useSWRConfig();

  const onSubmitEdit = useCallback(
    async (data: z.infer<typeof noteFormSchema>) => {
      try {
        const returnData = await editNote(data, id);
        await Promise.all([
          globalMutate('notes', (prev: (Tables<'notes'> | null)[] | undefined) =>
            prev?.map((item) => (item?.id === id ? returnData : item))
          ),
          mutate(returnData),
        ]);
        toast.success('Edit notes successful!!!');
        router.back();
      } catch (error: any) {
        const message = error?.message || 'Unknown Error';
        console.error('>> [EditNoteScreen]: Error in onSubmitEdit:', message);
        toast.error(message);
      }
    },
    [id]
  );

  useEffect(() => {
    if (fetchedData) {
      form.reset({
        ...fetchedData,
        title: fetchedData.title ?? '',
        content: fetchedData.content ?? '',
      });
    }
  }, [fetchedData]);

  if (!id) return <NotFoundScreen />;

  return (
    <Container>
      <Form {...form}>
        <FormController
          name="title"
          label="Title:"
          render={({ field }) => (
            <Input
              placeholder="Enter label"
              returnKeyType="next"
              editable={!(isLoading || error)}
              {...field}
            />
          )}
        />

        <FormController
          name="content"
          label="Content:"
          render={({ field }) => (
            <Textarea
              placeholder="Enter your content"
              editable={!(isLoading || error)}
              returnKeyType="next"
              {...field}
            />
          )}
        />
      </Form>

      <View className="flex flex-row gap-2">
        <StateButton
          variant="destructive"
          onPress={() => router.back()}
          disabled={isLoading || error}>
          <Text>Cancel</Text>
        </StateButton>
        <StateButton
          className="flex-1"
          disabled={isLoading || error || !form.formState.isDirty}
          onPress={form.handleSubmit(async (data) => {
            Keyboard.dismiss();
            await onSubmitEdit(data);
          })}>
          <Text>Submit</Text>
        </StateButton>
      </View>
    </Container>
  );
}
