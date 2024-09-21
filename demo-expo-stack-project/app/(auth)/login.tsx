// import libs
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

// import components
import { Container } from '@/components/container';
import { PasswordInput } from '@/components/customize-ui/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FormController } from '@/components/customize-ui/form';

// import utils
import { DEFAULT_LOGIN_FORM_VALUES, loginFormSchema, onSubmit } from '@/utils/form/login';

export default function LoginScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
    resolver: zodResolver(loginFormSchema)
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Login' }} />
      {/* <KeyboardAvoidingView> */}
      <Container>
        <View className="mb-4">
          <Text className="font-bold text-center mb-4" style={styles.title}>Welcome back!</Text>

          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View className="flex-3">
          <FormController
            control={control}
            label='Email address'
            name='email'
            errors={errors}
            render={({ field: { onChange, ...field } }) => (
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                placeholder="john@example.com"
                onChangeText={onChange}
                {...field}
              />)}
          />

          <FormController
            className=''
            control={control}
            label='Password'
            name='password'
            errors={errors}
            render={({ field: { onChange, ...field } }) => (
              <PasswordInput
                placeholder="********"
                onChangeText={onChange}
                {...field}
              />
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            className="mt-8"
          >
            <Text>Login</Text>
          </Button>

          <Button
            variant={"ghost"}
            className="space-x-2 mt-4"
            onPress={() => router.replace("/(auth)/register")}
          >
            <Text>
              Don't have an account?{" "}
              <Text className="underline">Register</Text></Text>
          </Button>
        </View>
      </Container>
      {/* </KeyboardAvoidingView> */}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    lineHeight: 40,
    fontSize: 32,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
});