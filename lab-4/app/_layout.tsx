import '~/global.css';

import * as React from 'react';

import { AppState, Platform, StatusBar } from 'react-native';
import { AuthProvider, FontSizeProvider, ThemeProvider } from '~/providers';
import { Slot, SplashScreen } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalHost } from '@rn-primitives/portal';
import { Toaster } from 'sonner-native';
import { supabase } from '~/utils/supabase';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { CartProvider } from '~/providers/cart-provider';

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});

export { ErrorBoundary } from 'expo-router';

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
      <AuthProvider>
        <FontSizeProvider>
          <CartProvider>
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
          </CartProvider>
        </FontSizeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
