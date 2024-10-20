import { Redirect, Slot } from 'expo-router';
import { useContext } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import { AuthContext } from '~/providers/auth-provider';

export default function AuthLayoutScreen() {
  const { session } = useContext(AuthContext);
  if (session) {
    return <Redirect href="/(drawer)/(bai-tap-3)/(main)" />;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        className="my-4 px-4"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Slot />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
