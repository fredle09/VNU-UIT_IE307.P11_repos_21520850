import { Slot } from 'expo-router';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { AuthProvider } from '~/providers';

export default function BaiTap3LayoutScreen() {
  return (
    <AuthProvider>
      <SafeAreaView>
        <KeyboardAvoidingView
          className="my-4 flex flex-col px-4"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Slot />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthProvider>
  );
}
