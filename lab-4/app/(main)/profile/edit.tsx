import { DEFAULT_PROFILE_FORM_VALUES, profileFormSchema } from '~/utils/form/profile';
import { Form, FormController } from '~/components/customize-ui/form';
import { Keyboard, SafeAreaView, ScrollView, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/customize-ui/input';
import { Phone } from '~/lib/icons/Phone';
import { Mail } from '~/lib/icons/Mail';
import { StateButton } from '~/components/customize-ui/state-button';
import { Text } from '~/components/ui/text';
import { User } from '~/lib/icons/User';
import { House } from '~/lib/icons/House';
import { StretchHorizontal } from '~/lib/icons/StretchHorizontal';
import { MapPinHouse } from '~/lib/icons/MapPinHouse';
import { router } from 'expo-router';
import { supabase } from '~/utils/supabase';
import { toast } from 'sonner-native';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useKeyboard } from '~/lib/keyboard';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthSession } from '~/providers';

export default function EditProfileScreen() {
  const { session, refreshUser } = useAuthSession();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof profileFormSchema>>({
    defaultValues: DEFAULT_PROFILE_FORM_VALUES,
    resolver: zodResolver(profileFormSchema),
  });

  useEffect(() => {
    form.reset(session?.user?.user_metadata);
  }, []);

  console.log('form.formState.isDirty', form.formState.isDirty);

  const onSubmit = useCallback(
    async (data: z.infer<typeof profileFormSchema>) => {
      const { email, ...dirtyFields }: Partial<typeof data> = Object.keys(data).reduce(
        (acc, key) => {
          if (form.getValues(key as keyof typeof data) !== session?.user?.user_metadata?.[key]) {
            acc[key as keyof typeof data] = data[key as keyof typeof data];
          }
          return acc;
        },
        {} as Partial<typeof data>
      );

      if (!session) return;
      const payload: Partial<typeof session.user.user_metadata> = {
        data: dirtyFields,
      }

      if (email) {
        payload.email = email;
      }

      setIsLoading(true);
      const promise = async () => {
        try {
          const { error: authError } = await supabase.auth.updateUser(payload);
          if (authError) throw authError;
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }

      toast.promise(promise(), {
        loading: 'Updating profile...',
        success: () => {
          refreshUser();
          router.back();
          return 'Profile updated successfully';
        },
        error: 'Failed to update profile',
      });

    },
    [form]
  );

  return (
    <SafeAreaView className="m-4">
      <ScrollView>
        <Form {...form}>
          <FormController
            name="name"
            label="Name:"
            render={({ field }) => (
              <Input
                childLeft={<User className="ml-1 size-6 text-zinc-500" />}
                autoCapitalize="words"
                placeholder="Enter your name"
                {...field}
              />
            )}
          />

          <FormController
            name="email"
            label="Email:"
            render={({ field }) => (
              <Input
                childLeft={<Mail className="ml-1 size-6 text-zinc-500" />}
                autoCapitalize="none"
                placeholder="Enter your email"
                editable={false}
                {...field}
              />
            )}
          />

          <FormController
            name="phone"
            label="Phone:"
            render={({ field }) => (
              <Input
                childLeft={<Phone className="ml-1 size-6 text-zinc-500" />}
                autoCapitalize="none"
                placeholder="Enter your phone"
                {...field}
              />
            )}
          />

          <FormController
            name="house_number"
            label="House number:"
            render={({ field }) => (
              <Input
                childLeft={<House className="ml-1 size-6 text-zinc-500" />}
                autoCapitalize="none"
                placeholder="Enter your house number"
                {...field}
              />
            )}
          />

          <FormController
            name="street"
            label="Street:"
            render={({ field }) => (
              <Input
                childLeft={<StretchHorizontal className="ml-1 size-6 text-zinc-500" />}
                autoCapitalize="none"
                placeholder="Enter street"
                {...field}
              />
            )}
          />

          <FormController
            name="city"
            label="City:"
            render={({ field }) => (
              <Input
                childLeft={<MapPinHouse className="ml-1 size-6 text-zinc-500" />}
                autoCapitalize="none"
                placeholder="Enter city"
                {...field}
              />
            )}
          />

          <StateButton
            onPress={form.handleSubmit(async (data) => {
              Keyboard.dismiss();
              await onSubmit(data);
            })}
            disabled={!form.formState.isDirty}
          >
            <Text>Update Profile</Text>
          </StateButton>
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
}
