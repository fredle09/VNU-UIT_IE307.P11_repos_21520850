import { Redirect, Tabs } from 'expo-router';
import { View } from 'lucide-react-native';

import { Home } from '~/lib/icons/Home';
import { LayoutGrid } from '~/lib/icons/LayoutGrid';
import { ShoppingCart } from '~/lib/icons/ShoppingCart';
import { User } from '~/lib/icons/User';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAuthSession } from '~/providers/auth-provider';
import { useCartContext } from '~/providers/cart-provider';

export default function BaiTap3MainLayout() {
  const { isDarkColorScheme } = useColorScheme();

  const { session } = useAuthSession();
  if (!session) return <Redirect href="/(auth)" />;

  const { cart } = useCartContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? 'white' : 'black',
        tabBarInactiveTintColor: isDarkColorScheme ? 'gray' : '#a9a9a9',
        headerShown: false,
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
          header: () => <View />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <ShoppingCart color={color} />,
          tabBarBadge: !!cart?.length ? cart.length > 9 ? "9+" : cart.length : undefined,
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
