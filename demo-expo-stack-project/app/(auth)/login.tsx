// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useRouter } from 'expo-router';

// import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';

import { supabase } from '~/utils/supabase';
import { Text } from '~/components/ui/text';

export default function LoginScreen() {
  const router = useRouter();
  // const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function login() {
    setLoading(true);
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && !user) {
      setLoading(false);
      alert('Check your email for the login link!');
    }

    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className="flex-1 justify-center items-center"
          // style={{ backgroundColor: isDarkmode ? '#17171E' : themeColor.white100 }}
          style={{ backgroundColor: '#17171E' }}
        >
          {/* <Image
            resizeMode="contain"
            className="h-56 w-56"
            source={require('../../../assets/images/login.png')}
          /> */}
        </View>

        {/* <View className={`flex-3 px-5 pb-5 ${isDarkmode ? 'bg-dark' : 'bg-white'}`}> */}
        <View className={`flex-3 px-5 pb-5 ${'bg-dark'}`}>
          <Text className="text-center font-bold py-7 text-lg">Login</Text>

          <Text>Email</Text>
          <Input
            className="mt-4"
            placeholder="Enter your email"
            value={email}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text: string) => setEmail(text)}
          />

          <Text className="mt-4">Password</Text>
          <Input
            className="mt-4"
            placeholder="Enter your password"
            value={password}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            secureTextEntry
            onChangeText={(text: string) => setPassword(text)}
          />

          <Button
            // text={loading ? 'Loading' : 'Continue'}
            onPress={() => login()}
            className="mt-5"
            disabled={loading}
          >
            {loading ? 'Loading' : 'Continue'}
          </Button>

          <View className="flex-row items-center mt-4 justify-center">
            <Text className="text-base">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-base font-bold ml-2">Register here</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mt-2 justify-center">
            <TouchableOpacity onPress={() => router.push('/(auth)/forget-password')}>
              <Text className="text-base font-bold">Forget password</Text>
            </TouchableOpacity>
          </View>

          {/* <View className="flex-row items-center mt-8 justify-center">
            <TouchableOpacity onPress={() => setTheme(isDarkmode ? 'light' : 'dark')}>
              <Text className="text-base font-bold ml-2">
                {isDarkmode ? '☀️ light theme' : '🌑 dark theme'}
                {'🌑 dark theme'}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

}
