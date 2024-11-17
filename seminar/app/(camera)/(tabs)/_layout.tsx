import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Camera, Construction, Fullscreen, ScanQrCode } from "@/lib/icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <Camera color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="scan-qr"
        options={{
          title: 'Scan QR',
          tabBarIcon: ({ color }) => <ScanQrCode color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="screenshot"
        options={{
          title: 'Screenshot',
          tabBarIcon: ({ color }) => <Fullscreen color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="prevent-screenshot"
        options={{
          title: 'Prevent',
          tabBarIcon: ({ color }) => <Construction color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
