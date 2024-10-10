import { Stack } from 'expo-router';

export default function BaiTap2Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="feedback"
        options={{ title: 'Frequently Asked Questions', presentation: 'modal' }}
      />
    </Stack>
  );
}
