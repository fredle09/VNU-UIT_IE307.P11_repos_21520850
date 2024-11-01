import React, { useState } from 'react';
import { View } from 'react-native';

import { DarkSwitch } from '~/components/customize-ui/dark-switch';
import { Slider } from '~/components/deprecated-ui';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { useColorScheme } from '~/lib/useColorScheme';

export default function SettingsScreen() {
  const { toggleColorScheme } = useColorScheme();
  const [value, onValueChange] = useState(14);

  return (
    <View className="flex flex-1 flex-col justify-center gap-4 p-6">
      <Button
        variant="ghost"
        size="lg"
        className="flex flex-row items-center justify-between"
        onPress={toggleColorScheme}>
        <Label>Dark Mode</Label>
        <DarkSwitch />
      </Button>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={10}
        maximumValue={30}
        step={1}
      />
    </View>
  );
}
