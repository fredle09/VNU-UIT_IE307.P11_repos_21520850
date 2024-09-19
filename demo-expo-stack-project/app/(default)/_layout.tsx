// import libs
import { useState } from 'react';

// import components
import { Redirect, Stack } from 'expo-router';
import { Text } from '~/components/ui/text';

// import utils
import { supabase } from '~/utils/supabase';

export default async function AppLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const { data } = await supabase.auth.getSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!data?.session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
