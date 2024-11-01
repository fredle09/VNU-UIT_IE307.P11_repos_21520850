import '~/global.css';

import { PortalHost } from '@rn-primitives/portal';
import { Slot, SplashScreen } from 'expo-router';
import * as React from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';

import { ThemeProvider } from '~/providers';
import { supabase } from '~/utils/supabase';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Check auth-auth-refresh
  React.useEffect(() => {
    const handleAppStateChange = () => {
      if (AppState.currentState === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView className="flex flex-1">
      <ThemeProvider>
        <Slot />
        <PortalHost />
        <Toaster
          richColors
          position="top-center"
          visibleToasts={2}
          offset={Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0 + 14) : 0}
        />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
