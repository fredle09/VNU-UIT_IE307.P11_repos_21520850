import { Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

export const unstable_settings = {
  initialRouteName: '(place)',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
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
