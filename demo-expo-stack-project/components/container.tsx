// import components
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <KeyboardAvoidingView className='flex flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
      <ScrollView className='flex flex-1'>
        <SafeAreaView className="flex flex-1 m-6 mb-40">
          {children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
