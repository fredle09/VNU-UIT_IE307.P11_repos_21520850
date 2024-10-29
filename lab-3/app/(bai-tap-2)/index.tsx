import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function BaiTap2Screen() {
  return (
    <View className="p-4">
      <Text>BaiTap2Screen</Text>
      <Button onPress={() => router.back()}>
        <Text>Back to MainPage</Text>
      </Button>
    </View>
  );
}
