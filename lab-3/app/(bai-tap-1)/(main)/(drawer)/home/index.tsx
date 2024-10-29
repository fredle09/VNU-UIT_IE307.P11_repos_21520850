import { router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function BaiTap1HomeScreen() {
  return (
    <View className="my-4 flex flex-1 flex-col items-center justify-center px-4">
      <Text>Home Screen</Text>
      <Button onPress={() => router.push('/(bai-tap-1)/(main)/home-details')}>
        <Text>Go to Details</Text>
      </Button>
    </View>
  );
}
