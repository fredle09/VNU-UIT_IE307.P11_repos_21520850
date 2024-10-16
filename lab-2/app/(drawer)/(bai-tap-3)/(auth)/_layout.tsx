import { Redirect, Slot } from 'expo-router';
import { useContext } from 'react';

import { AuthContext } from '~/providers/auth-provider';

export default function AuthLayoutScreen() {
  const { session } = useContext(AuthContext);
  if (session) {
    return <Redirect href="/(drawer)/(bai-tap-3)/(main)/" />;
  }

  return <Slot />;
}
