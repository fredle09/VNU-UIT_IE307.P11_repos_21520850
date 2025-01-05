import { PortalHost } from '@rn-primitives/portal';
import { Slot } from 'expo-router';
import '../global.css';
import { StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';

import { ThemeProvider } from '~/providers/theme-provider';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <Slot />
        <PortalHost />
        <Toaster
          richColors
          position='top-center'
          visibleToasts={2}
          offset={Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0 + 16) : 0}
        />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
