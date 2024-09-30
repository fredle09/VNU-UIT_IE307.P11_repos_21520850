import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoonStar } from '../../lib/icons/MoonStar';
import { Sun } from '../../lib/icons/Sun';
import { Toggle, ToggleIcon } from '../ui/toggle';

import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { useColorScheme } from '~/lib/useColorScheme';
import { cn } from '~/lib/utils';

export const DarkToggle = ({ className }: { className?: string }) => {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  return (
    <Toggle
      className={cn('bg-transparent', className)}
      pressed={isDarkColorScheme}
      onPressedChange={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark';
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
      aria-label="Toggle bold"
      variant="default">
      <ToggleIcon icon={isDarkColorScheme ? MoonStar : Sun} size={18} />
    </Toggle>
  );
};
