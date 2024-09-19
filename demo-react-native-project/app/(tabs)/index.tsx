import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Tab One</Text>
      <View className="my-8 h-px w-4/5" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}