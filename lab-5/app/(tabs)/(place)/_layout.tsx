import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function PlaceLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='add-new-place' />
      <Stack.Screen name='camera' />
      <Stack.Screen name='pick-on-map' />
      <Stack.Screen name='detail-item' />
      <Stack.Screen name='view-on-map' />
    </Stack>
  );
}
