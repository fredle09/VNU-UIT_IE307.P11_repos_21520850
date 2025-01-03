import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, type ParamListBase, type TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Dimensions } from 'react-native';
import { cn } from '~/lib/utils';
import { Grid2X2 } from '~/lib/icons/Grid2x2';
import { Cable } from '~/lib/icons/Cable';
import { Gem } from '~/lib/icons/Gem';
import { Shirt } from '~/lib/icons/Shirt';
import React from 'react';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TABS = [
  ['all', 'All', Grid2X2],
  ['electronics', 'Electronics', Cable],
  ['jewelery', 'Jewelery', Gem],
  ['men-clothing', 'Men\'s Clothes', Shirt],
  ['women-clothing', 'Women\'s Clothes', Shirt],
] as const;
const width = Dimensions.get('window').width;

export default function BaiTap3CategoriesLayoutScreen() {
  const { colors } = useTheme();

  return (
    <MaterialTopTabs
      initialRouteName='all'
      className={cn('flex-1')}
      tabBarPosition='top'
      screenOptions={{
        tabBarStyle: { width, maxWidth: width, minWidth: width, marginTop: 12, shadowColor: 'transparent' },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: 'grey',
        tabBarIndicatorStyle: { backgroundColor: colors.text },
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          fontSize: 12,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
      }}>
      {TABS.map(([name, title, Icons]) => (
        <MaterialTopTabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: () => Icons
              ? <Icons className="size-6 text-black" />
              : <></>,
          }}
        />
      ))}
    </MaterialTopTabs>
  );
}
