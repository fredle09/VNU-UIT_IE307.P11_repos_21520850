// import libs
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Keyboard, View } from 'react-native';
import { toast } from 'sonner-native';
import { z } from 'zod';

// Import components
import { Form, FormController } from '~/components/customize-ui/form';
import { PasswordInput } from '~/components/customize-ui/password-input';
import { StateButton } from '~/components/customize-ui/state-button';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/customize-ui/input';
import { Text } from '~/components/ui/text';
import { DEFAULT_LOGIN_FORM_VALUES, loginFormSchema } from '~/utils/form/login';
import { supabase } from '~/utils/supabase';
import { Mail } from '~/lib/icons/Mail';
import { Lock } from '~/lib/icons/Lock';

export default function LogicScreen() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = useCallback(async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(data);

      if (error) {
        throw error;
      }

      toast.success('Login Successful!!!');
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('An unexpected error occurred');
        return;
      }

      // Check if the error message indicates invalid credentials
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password');
        form.setError('email', { type: 'manual', message: 'Invalid email or password' });
        form.setError('password', { type: 'manual', message: 'Invalid email or password' });
        return;
      }

      toast.error(error.message);
    }
  }, []);

  const formSubmit = useCallback(
    form.handleSubmit(async (data) => {
      Keyboard.dismiss();
      await onSubmit(data);
    }),
    [form.handleSubmit, onSubmit]
  );

  return (
    <View>
      <Form {...form}>
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

        <View className="flex flex-row justify-end">
          <Button size="extraSm" variant="link" className="mb-4">
            <Text>Forgot Password?</Text>
          </Button>
        </View>

        <StateButton onPress={formSubmit}>
          <Text>Login</Text>
        </StateButton>
      </Form>

      <View className="flex items-center justify-center py-2">
        <Text className="text-lg font-bold">OR</Text>
      </View>

      <View className="flex flex-col gap-4">
        <Button variant="outline" className="flex flex-row">
          <Image className="mr-2 size-6" source={require('~/assets/google.png')} />
          <Text>Sign in with Google</Text>
        </Button>

        <Button variant="outline" className="flex flex-row">
          <Image className="mr-2 size-6" source={require('~/assets/facebook.png')} />
          <Text>Sign in with Facebook</Text>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-row"
          onPress={() => router.replace('/(auth)/register')}>
          <Text>Don't have an account? </Text>
          <Text className="font-bold underline">Sign Up</Text>
        </Button>
      </View>
    </View>
  );
}
