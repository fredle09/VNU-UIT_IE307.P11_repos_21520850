import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme } from 'nativewind';
import { useCallback } from 'react';

import { setAndroidNavigationBar } from './android-navigation-bar';

export function useColorScheme() {
  // const { setColorScheme: setNativewindColorScheme } = useNativewindColorScheme();
  const safetyColorScheme = colorScheme.get() ?? 'light';

  const setColorScheme = useCallback((newColorScheme: 'light' | 'dark') => {
    colorScheme.set(newColorScheme);
    setAndroidNavigationBar(newColorScheme);
    AsyncStorage.setItem('theme', newColorScheme);
  }, []);

  const toggleColorScheme = () => {
    const newTheme = safetyColorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
  };

  return {
    colorScheme: safetyColorScheme,
    isDarkColorScheme: safetyColorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
