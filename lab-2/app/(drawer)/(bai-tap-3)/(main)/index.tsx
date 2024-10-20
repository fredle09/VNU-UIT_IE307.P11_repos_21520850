import { useCallback } from 'react';
import { View } from 'react-native';
import { toast } from 'sonner-native';

import { StateButton } from '~/components/customize-ui/state-button';
import { Text } from '~/components/ui/text';
import { supabase } from '~/utils/supabase';

export default function BaiTap3MainScreen() {
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
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
    <View>
      <Text>BaiTap3Main</Text>
      <StateButton onPress={signOut}>
        <Text>Sign Out</Text>
      </StateButton>
    </View>
  );
}
