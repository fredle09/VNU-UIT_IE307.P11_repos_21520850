import { CameraProvider } from "@/components/CameraProvider";
import { Stack } from "expo-router";

export default function CameraLayout() {
  return (
    <CameraProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="image-preview" options={{
          headerShown: true,
          title: "Image Review",
          presentation: "modal",
        }} />
      </Stack>
    </CameraProvider>
  )
};
