// import libs
import { useContext } from 'react';

// import components
import { Redirect, Slot } from 'expo-router';

// import utils
import { AuthContext } from '@/provider/auth-provider';

export default function AppLayout() {
  const { user } = useContext(AuthContext);

  // // Only require authentication within the (app) group's layout as users
  // // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Slot />;
}
