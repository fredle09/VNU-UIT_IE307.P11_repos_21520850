import { Stack } from "expo-router";

export default function IndexLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="products/[id]" />
    </Stack>
  )
};
