import '@/global.css';

// import libs
import * as React from 'react';
import { AppState } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { getNetworkStateAsync } from 'expo-network';

// import components
import { toast, Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import utils
import { supabase } from '@/utils/supabase';
import { AuthProvider } from '@/provider/auth-provider';
import { ThemeProvider } from '@/provider/theme-provider';


// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.

export default function Layout() {
  // Check network states
  React.useEffect(() => {
    const checkNetwork = async () => {
      const { isConnected, isInternetReachable } = await getNetworkStateAsync();
      if (!isConnected || !isInternetReachable)
        toast.warning("Your network is not ok!!!", {
          description: "Please check your network again."
        });
    }

    const subscription = setInterval(checkNetwork, 60000);
    return () => clearInterval(subscription);
  }, []);

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
