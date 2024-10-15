// import libs
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { z } from 'zod';

// Import components
import { Form, FormController } from '~/components/customize-ui/form';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { DEFAULT_LOGIN_FORM_VALUES, loginFormSchema, onSubmit } from '~/utils/form/login';

export default function LogicScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
    resolver: zodResolver(loginFormSchema),
  });

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   keyboardVerticalOffset={100} // Adjust offset as needed
    // >
    //   <View>
    //     <Form {...form}>
    //       <FormController
    //         name="email"
    //         label="Email:"
    //         render={({ field }) => <Input placeholder="shadcn" {...field} />}
    //       />

    //       <FormController
    //         name="password"
    //         label="Password:"
    //         render={({ field }) => <Input placeholder="shadcn" secureTextEntry {...field} />}
    //       />

    //       <Button onPress={form.handleSubmit(onSubmit)}>
    //         <Text>Chiu</Text>
    //       </Button>
    //     </Form>
    //   </View>
    // </KeyboardAvoidingView>
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input placeholder="First name" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Hehe</Text>
      </Button>
    </View>
  );
}
