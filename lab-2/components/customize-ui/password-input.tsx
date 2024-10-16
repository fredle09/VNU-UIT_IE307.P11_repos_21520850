import * as React from 'react';
import { TextInput, View } from 'react-native';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { Eye } from '~/lib/icons/Eye';
import { EyeOff } from '~/lib/icons/EyeOff';

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = React.useCallback(
    () => setShowPassword((prev) => !prev),
    [setShowPassword]
  );
  const Icon = showPassword ? Eye : EyeOff;

  return (
    <View className="relative">
      <Input ref={ref} secureTextEntry={!showPassword} {...props} />
      <Button
        className="absolute right-1 top-1/2 -translate-y-1/2"
        size="icon"
        variant="ghost"
        onPress={toggleShowPassword}>
        <Icon className="size-6 text-black dark:text-white" />
      </Button>
    </View>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
