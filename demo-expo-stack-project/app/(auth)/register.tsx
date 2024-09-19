// import libs
import React, { useState } from 'react';
import { Stack } from 'expo-router';

// import components
import { StyleSheet, View, } from 'react-native';
import { Text } from '~/components/ui/text';
import { Container } from '~/components/container';
import { Button } from "~/components/ui/button";
import { Checkbox } from '~/components/ui/checkbox';
import { useRouter } from 'expo-router';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

// import utils
import { supabase } from '~/utils/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function register() {
    setIsLoading(true);

    if (!form.email || !form.password || !form.confirmPassword) {
      setIsLoading(false);
      return alert('All fields are required!');
    }

    // validation form
    if (form.password !== form.confirmPassword) {
      setIsLoading(false);
      return alert('Passwords do not match!');
    }

    await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    setIsLoading(false);
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Register' }} />
      <Container>
        {/* <KeyboardAvoidingView> */}
        {/* <View style={styles.container}> */}
        {/* <View style={styles.header}>
          <View style={styles.headerBack}>
          </View>

          <Text style={styles.title}>Let's Get Started!</Text>

          <Text style={styles.subtitle}>
            Fill in the fields below to get started with your new account.
          </Text>
        </View> */}

        <View>
          <View style={styles.input}>
            <Label nativeID="name">Full Name</Label>

            <Input
              id="name"
              clearButtonMode="while-editing"
              onChangeText={name => setForm({ ...form, name })}
              placeholder="John Doe"
              // placeholderTextColor="#6b7280"
              // style={styles.inputControl}
              value={form.name} />
          </View>

          <View style={styles.input}>
            <Label nativeID='email'>Email Address</Label>

            <Input
              id="email"
              // autoCapitalize="none"
              // autoCorrect={false}
              // clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={email => setForm({ ...form, email })}
              placeholder="john@example.com"
              // placeholderTextColor="#6b7280"
              // style={styles.inputControl}
              value={form.email} />
          </View>

          <View style={styles.input}>
            <Label nativeID='password'>Password</Label>

            <Input
              id="password"
              // autoCorrect={false}
              // clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              // placeholderTextColor="#6b7280"
              // style={styles.inputControl}
              secureTextEntry={true}
              value={form.password} />
          </View>

          <View style={styles.input}>
            <Label nativeID='confirm-password'>Confirm Password</Label>

            <Input
              id="confirm-password"
              // autoCorrect={false}
              // clearButtonMode="while-editing"
              onChangeText={confirmPassword => setForm({ ...form, confirmPassword })}
              placeholder="********"
              // placeholderTextColor="#6b7280"
              // style={styles.inputControl}
              secureTextEntry={true}
              value={form.confirmPassword} />
          </View>

          <View>
            <Button
              variant="ghost" className='mt-2 flex flex-row justify-center gap-2 flex-shrink-0'
              onPress={() => setRememberMe(prev => !prev)}
            >
              <Checkbox
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <Text>Renember me?</Text>
            </Button>
          </View>

          <View className="mt-4">
            <Button
              onPress={register}
              disabled={isLoading}
            >
              <Text>Register</Text>
            </Button>
          </View>
        </View>

        <Button variant="ghost" className="mt-8" onPress={() => router.push("/(auth)/login")}>
          <Text>
            Already have an account?{' '}
            <Text className='text-bold'>Login</Text>
          </Text>
        </Button>
        {/* </View> */}
        {/* </KeyboardAvoidingView> */}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: 'relative',
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
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
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});