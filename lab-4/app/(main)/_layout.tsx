import { Redirect, Tabs } from 'expo-router';

import { Home } from '~/lib/icons/Home';
import { LayoutGrid } from '~/lib/icons/LayoutGrid';
import { ShoppingCart } from '~/lib/icons/ShoppingCart';
import { User } from '~/lib/icons/User';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAuthSession } from '~/providers/auth-provider';

export default function BaiTap3MainLayout() {
  const { isDarkColorScheme } = useColorScheme();

  const { session } = useAuthSession();
  if (!session) return <Redirect href="/(auth)" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? 'white' : 'black',
        tabBarInactiveTintColor: isDarkColorScheme ? 'gray' : '#a9a9a9',
      }}>
      <Tabs.Screen
        name="index"
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
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <ShoppingCart color={color} />,
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
