// import libs
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { toast } from 'sonner-native';
import { z } from 'zod';

// Import components
import { Form, FormController } from '~/components/customize-ui/form';
import { PasswordInput } from '~/components/customize-ui/password-input';
import { StateButton } from '~/components/customize-ui/state-button';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/customize-ui/input';
import { Text } from '~/components/ui/text';
import { DEFAULT_REGISTER_FORM_VALUES, registerFormSchema } from '~/utils/form/register';
import { supabase } from '~/utils/supabase';
import { User } from '~/lib/icons/User';
import { Mail } from '~/lib/icons/Mail';
import { Lock } from '~/lib/icons/Lock';

export default function RegisterScreen() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    defaultValues: DEFAULT_REGISTER_FORM_VALUES,
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = useCallback(async (data: z.infer<typeof registerFormSchema>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) throw error;

      toast.success('Register Successful!!!');
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('An unexpected error occurred');
        return;
      }

      if (error.message.includes('User already registered')) {
        form.setError('email', { type: 'manual', message: 'This email already used' });
        return;
      }

      toast.error(error.message);
    }
  }, []);

  return (
    <View>
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
              {...field}
            />
          )}
        />

        <FormController
          name="password"
          label="Password:"
          render={({ field }) => (
            <PasswordInput
              childLeft={<Lock className="ml-1 size-6 text-zinc-500" />}
              autoCapitalize="none"
              placeholder="Enter your password"
              {...field}
            />
          )}
        />

        <FormController
          name="passwordConfirm"
          label="Password Confimation:"
          render={({ field }) => (
            <PasswordInput
              childLeft={<Lock className="ml-1 size-6 text-zinc-500" />}
              autoCapitalize="none"
              placeholder="Repeat your password"
              {...field}
            />
          )}
        />

        <StateButton
          onPress={form.handleSubmit(async (data) => {
            Keyboard.dismiss();
            await onSubmit(data);
          })}>
          <Text>Submit</Text>
        </StateButton>
      </Form>

      <View className="flex items-center justify-center py-2">
        <Text className="text-lg font-bold">OR</Text>
      </View>

      <Button
        variant="ghost"
        className="flex flex-row"
        onPress={() => router.replace('/(auth)/login')}>
        <Text>Already have an account? </Text>
        <Text className="font-bold underline">Sign In</Text>
      </Button>
    </View>
  );
}
