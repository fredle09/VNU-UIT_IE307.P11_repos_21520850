import { Redirect, Slot } from 'expo-router';
import { ActivityIndicator, Image, View } from 'react-native';

import { Container } from '~/components/container';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAuthSession } from '~/providers/auth-provider';

export default function AuthLayoutScreen() {
  const { session, isLoading } = useAuthSession();
  const { isDarkColorScheme } = useColorScheme();
  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="small" color={isDarkColorScheme ? 'dark' : 'white'} />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(bai-tap-1)/(main)" />;
  }

  return (
    <Container>
      <View className="flex items-center justify-center">
        <Image className="size-32 rounded-full" source={require('~/assets/avatar.jpg')} />
        <Text className="my-4 text-lg font-bold">React Native App</Text>
      </View>
      <Slot />
    </Container>
  );
}