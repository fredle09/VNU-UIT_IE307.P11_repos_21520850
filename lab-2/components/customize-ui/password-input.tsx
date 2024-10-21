import * as React from 'react';
import { TextInput } from 'react-native';

import { Button } from '../ui/button';
import { Input as CInput } from './input';

import { Eye } from '~/lib/icons/Eye';
import { EyeOff } from '~/lib/icons/EyeOff';

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  Omit<React.ComponentPropsWithoutRef<typeof TextInput>, 'secureTextEntry'> & {
    childLeft?: React.ReactNode;
  }
>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = React.useCallback(
    () => setShowPassword((prev) => !prev),
    [setShowPassword]
  );
  const Icon = showPassword ? Eye : EyeOff;

  return (
    <CInput
      ref={ref}
      childRight={
        <Button size="icon" variant="ghost" onPress={toggleShowPassword}>
          <Icon className="size-6 text-zinc-500" />
        </Button>
      }
      secureTextEntry={!showPassword}
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
