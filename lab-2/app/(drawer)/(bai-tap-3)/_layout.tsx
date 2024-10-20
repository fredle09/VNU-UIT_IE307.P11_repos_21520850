import { Slot } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import { AuthProvider } from '~/providers';

export default function BaiTap3LayoutScreen() {
  return (
    <AuthProvider>
      <SafeAreaView>
        <KeyboardAvoidingView
          className="my-4 flex flex-col px-4"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Slot />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthProvider>
  );
}
