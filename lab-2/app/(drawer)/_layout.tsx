import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
// import { View } from 'react-native';

import { DarkToggle } from '~/components/customize-ui/dark-toggle';
import { HeaderButton } from '~/components/header-button';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="(bai-tap-1)/index"
      options={{
        headerTitle: 'Bài tập 1',
        drawerLabel: 'Bài tập 1',
        headerRight: () => <DarkToggle className="pr-2" />,
        drawerIcon: ({ size, color }) => (
          <Ionicons name="document-text-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="(bai-tap-2)/index"
      options={{
        headerTitle: 'Bài tập 2',
        drawerLabel: 'Bài tập 2',
        headerRight: () => <DarkToggle className="pr-2" />,
        drawerIcon: ({ size, color }) => (
          <Ionicons name="document-text-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="(bai-tap-3)"
      options={{
        headerTitle: 'Bài tập 3',
        drawerLabel: 'Bài tập 3',
        headerRight: () => <DarkToggle className="pr-2" />,
        drawerIcon: ({ size, color }) => (
          <Ionicons name="document-text-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'Tabs',
        drawerLabel: 'Tabs',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="border-bottom" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
