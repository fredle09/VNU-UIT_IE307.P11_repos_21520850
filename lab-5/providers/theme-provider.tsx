import '~/global.css';

import {
  BeVietnam_400Regular,
  BeVietnam_500Medium,
  BeVietnam_600SemiBold,
  BeVietnam_700Bold,
  useFonts,
} from '@expo-google-fonts/be-vietnam';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider as RNThemeProvider, Theme } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

type FontStyle = {
  fontFamily: string;
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = (props: Props) => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    regular: BeVietnam_400Regular,
    medium: BeVietnam_500Medium,
    bold: BeVietnam_600SemiBold,
    heavy: BeVietnam_700Bold,
  });

  const FONTS: {
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
  } = {
    regular: {
      fontFamily: 'BeVietnam_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'BeVietnam_500Medium',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'BeVietnam_600SemiBold',
      fontWeight: '600',
    },
    heavy: {
      fontFamily: 'BeVietnam_700Bold',
      fontWeight: '700',
    },
  };

  const LIGHT_THEME: Theme = {
    dark: false,
    colors: NAV_THEME.light,
    fonts: FONTS,
  };
  const DARK_THEME: Theme = {
    dark: true,
    colors: NAV_THEME.dark,
    fonts: FONTS,
  };

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') document.documentElement.classList.add('bg-background');

      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded || !fontsLoaded) {
    return null;
  }

  return (
    <RNThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <View className='bg-background flex-1'>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        {props.children}
      </View>
    </RNThemeProvider>
  );
};

export { ThemeProvider };
