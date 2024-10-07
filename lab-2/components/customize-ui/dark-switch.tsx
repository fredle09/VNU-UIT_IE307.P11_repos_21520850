import React from 'react';

import { Switch } from '../ui/switch';

import { useColorScheme } from '~/lib/useColorScheme';

export const DarkSwitch = (props: { nativeID?: string }) => {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return <Switch {...props} checked={isDarkColorScheme} onCheckedChange={toggleColorScheme} />;
};
