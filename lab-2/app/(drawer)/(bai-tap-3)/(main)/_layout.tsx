import { Redirect, Tabs } from 'expo-router';
import { useContext } from 'react';

import { Heart } from '~/lib/icons/Heart';
import { Home } from '~/lib/icons/Home';
import { LayoutGrid } from '~/lib/icons/LayoutGrid';
import { User } from '~/lib/icons/User';
import { useColorScheme } from '~/lib/useColorScheme';
import { AuthContext } from '~/providers/auth-provider';

export default function BaiTap3MainLayout() {
  const { session } = useContext(AuthContext);
  const { isDarkColorScheme } = useColorScheme();
  if (!session) return <Redirect href="/(drawer)/(bai-tap-3)/(auth)" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDarkColorScheme ? 'white' : 'black',
        tabBarInactiveTintColor: isDarkColorScheme ? 'gray' : '#a9a9a9',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <LayoutGrid color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color }) => <Heart color={color} />,
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  );
}
