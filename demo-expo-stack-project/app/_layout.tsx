import '~/global.css';

// import libs
import * as React from 'react';
import { AppState } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';

// import components
import { Toaster } from 'sonner-native';

// import utils
import { supabase } from '~/utils/supabase';
import { AuthProvider } from '~/provider/auth-provider';
import { ThemeProvider } from '~/provider/theme-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toaster richColors visibleToasts={2} gap={8} />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
