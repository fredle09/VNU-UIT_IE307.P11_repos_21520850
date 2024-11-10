import { useCallback } from 'react';
import { View } from 'react-native';
import { toast } from 'sonner-native';

import { StateButton } from '~/components/customize-ui/state-button';
import { Text } from '~/components/ui/text';
import { useAuthSession } from '~/providers/auth-provider';

export default function BaiTap3ProfileScreen() {
  const { session, signOut: _signOut } = useAuthSession();
  const signOut = useCallback(async () => {
    try {
      // await supabase.auth.signOut();
      await _signOut();
      console.log('Signed out successfully:', session);
      toast.success('Signed out successfully');
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('An unexpected error occurred while signing out');
        return;
      }

      toast.error(`Error signing out: ${error?.message}`);
    }
  }, []);

  return (
    <View className="my-4 flex flex-1 flex-col items-center justify-center px-4">
      <Text>Profile Screen</Text>
      <StateButton onPress={signOut}>
        <Text>Sign Out</Text>
      </StateButton>
    </View>
  );
}
