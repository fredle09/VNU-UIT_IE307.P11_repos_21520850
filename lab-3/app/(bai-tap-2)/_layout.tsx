import { Tabs } from 'expo-router';

import { Home } from '~/lib/icons/Home';
import { Settings } from '~/lib/icons/Settings';
import { SWRConfigProvider } from '~/providers';

export default function BaiTap2LayoutScreen() {
  return (
    <SWRConfigProvider>
      <Tabs>
        <Tabs.Screen
          name="notes"
          options={{
            title: 'Notes',
            headerShown: false,
            tabBarIcon: ({ color }) => <Home color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }}
        />
      </Tabs>
    </SWRConfigProvider>
  );
}
