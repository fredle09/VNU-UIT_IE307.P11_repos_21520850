import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" options={{
        headerTitle: 'Edit Profile',
        headerBackTitle: 'Back',
        headerShown: true,
      }} />
    </Stack>
  )
};
