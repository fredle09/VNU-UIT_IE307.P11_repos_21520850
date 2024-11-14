import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

import { usePathname } from '~/lib/hooks';

export default function MainLayoutScreen() {
  const pathname = usePathname();

  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          headerShown: !/home\/.*/.test(pathname),
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notification"
        options={{
          headerTitle: 'Notification',
          drawerLabel: 'Notification',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          headerTitle: 'Help',
          drawerLabel: 'Help',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="help-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
