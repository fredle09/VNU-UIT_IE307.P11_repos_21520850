import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { Link } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Container } from '~/components/container';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';

// import utils
import { supabase } from '~/utils/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function login() {
    setIsLoading(true);
    if (!form?.email || !form?.password) {
      setIsLoading(false);
      return alert('All fields are required!');
    }

    const { data: user, error } = await supabase.auth.signInWithPassword(form);

    if (!error && !user) {
      setIsLoading(false);
      return alert('Check your email for the login link!');
    }

    if (error) {
      setIsLoading(false);
      alert(error.message);
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Login' }} />
      {/* <KeyboardAvoidingView> */}
      <View className="flex p-6">
        <View className="flex-1">
          <Text style={styles.title}>Welcome back!</Text>

          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View className="flex-3" style={styles.form}>
          <View className="mt-2">
            <Label nativeID='email-address'>Email address</Label>

            <Input
              id="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={email => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              // style={styles.inputControl}
              value={form.email} />
          </View>

          <View className="mt-2">
            <Label nativeID='password'>Password</Label>

            <Input
              id="password"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              // style={styles.inputControl}
              secureTextEntry={true}
              value={form.password} />
          </View>

          <Button
            onPress={login}
            disabled={isLoading}
            className="mt-8"
          >
            <Text>Login</Text>
          </Button>
          {/* <View style={styles.formAction}>
            
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <Button
            variant={"ghost"}
            className="space-x-2 mt-4"
            onPress={() => router.push("/(auth)/register")}
          >
            <Text>Don't have an account? <Text className="underline">Register</Text></Text>
          </Button>

          {/* <TouchableOpacity
            disabled={isLoading}
            onPress={login}>
            <Text style={styles.formFooter}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   padding: 24,
  //   flexGrow: 1,
  //   flexShrink: 1,
  //   flexBasis: 0,
  // },
  // header: {
  //   marginVertical: 36,
  // },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});