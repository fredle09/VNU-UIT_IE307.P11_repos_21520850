import { Slot } from 'expo-router';

import { AuthProvider } from '~/providers';

export default function BaiTap3LayoutScreen() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
