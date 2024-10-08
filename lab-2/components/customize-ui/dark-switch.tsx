import React, { useId } from 'react';

import { Switch } from '../ui/switch';

import { useColorScheme } from '~/lib/useColorScheme';

export const DarkSwitch = (props: { nativeID?: string }) => {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();
  const id = useId();
  const { nativeID = id, ...rest } = props;

  return (
    <Switch
      nativeID={nativeID}
      {...rest}
      checked={isDarkColorScheme}
      onCheckedChange={toggleColorScheme}
    />
  );
};
