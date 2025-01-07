import { Redirect, Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

import { useColorScheme } from '~/lib/useColorScheme';
import { useAuthSession } from '~/providers/auth-provider';

export const unstable_settings = {
  initialRouteName: '(place)',
};

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();

  const { session } = useAuthSession();
  if (!session) return <Redirect href='/(auth)' />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? 'white' : 'black',
        tabBarInactiveTintColor: isDarkColorScheme ? 'gray' : '#a9a9a9',
      }}>
      <Tabs.Screen
        name='(place)'
        options={{
          title: 'Place',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='(media)'
        options={{
          title: 'Media',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
    </Tabs>
  );
}
