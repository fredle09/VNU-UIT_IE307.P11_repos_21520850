import '~/global.css';

import { SplashScreen, Stack } from 'expo-router';
import * as React from 'react';

import { AuthProvider } from '~/provider/auth-provider';
import { ThemeProvider } from '~/provider/theme-provider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </ThemeProvider>
  );
}
