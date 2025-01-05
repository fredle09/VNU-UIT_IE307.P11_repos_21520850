import { Stack } from 'expo-router';

export default function MediaLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='my-gallery' />
      <Stack.Screen name='record-video' />
    </Stack>
  );
}
