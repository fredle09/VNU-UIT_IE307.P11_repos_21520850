import { Redirect, Stack } from 'expo-router';

import { useAuthSession } from '~/providers/auth-provider';

export default function MainLayoutScreen() {
  const { session } = useAuthSession();
  if (!session) {
    return <Redirect href="/(bai-tap-1)/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="home-details" options={{ title: 'Home Details' }} />
      <Stack.Screen name="notification-details" options={{ title: 'Notification Details' }} />
    </Stack>
  );
}
