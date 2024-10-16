// import libs
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { z } from 'zod';

// Import components
import { Form, FormController } from '~/components/customize-ui/form';
import { PasswordInput } from '~/components/customize-ui/password-input';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { DEFAULT_LOGIN_FORM_VALUES, loginFormSchema, onSubmit } from '~/utils/form/login';

export default function LogicScreen() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <View>
      <Form {...form}>
        <FormController
          name="email"
          label="Email:"
          render={({ field }) => <Input placeholder="Enter your email" {...field} />}
        />

        <FormController
          name="password"
          label="Password:"
          render={({ field }) => <PasswordInput placeholder="Enter your password" {...field} />}
        />

        <Button
          onPress={form.handleSubmit((props) => {
            Keyboard.dismiss();
            onSubmit(props);
          })}>
          <Text>Chiu</Text>
        </Button>
      </Form>
    </View>
  );
}
