import React from 'react';
import { View } from 'react-native';

import { DarkSwitch } from '~/components/customize-ui/dark-switch';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { useColorScheme } from '~/lib/useColorScheme';

export default function SettingsScreen() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <View>
      <Button
        variant="ghost"
        size="lg"
        className="flex flex-row items-center justify-between"
        onPress={toggleColorScheme}>
        <Label>Dark Mode</Label>
        <DarkSwitch />
      </Button>
    </View>
  );
}
