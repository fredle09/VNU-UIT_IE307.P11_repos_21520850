import React from 'react';
import { View } from 'react-native';

import { DarkSwitch } from '~/components/customize-ui/dark-switch';
import { Slider } from '~/components/deprecated-ui';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { useFontSize } from '~/providers';

export default function SettingsScreen() {
  const { toggleColorScheme } = useColorScheme();
  const { fontSize, setFontSize } = useFontSize();

  return (
    <View className="flex flex-1 flex-col justify-center gap-4 p-4">
      <Button
        variant="ghost"
        size="lg"
        className="flex flex-row items-center justify-between"
        onPress={toggleColorScheme}>
        <Label>Dark Mode</Label>
        <DarkSwitch />
      </Button>
      <View className="px-6">
        <View className="mb-4 flex flex-row items-center justify-between">
          <Text>Font Size</Text>
          <Text>{fontSize}</Text>
        </View>
        <Slider
          value={fontSize}
          onValueChange={setFontSize}
          minimumValue={14}
          maximumValue={28}
          step={1}
        />
      </View>
    </View>
  );
}
