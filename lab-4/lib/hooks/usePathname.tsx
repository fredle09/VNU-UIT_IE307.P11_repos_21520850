import { useSegments } from 'expo-router';

export const usePathname = () => {
  const segments = useSegments();
  return segments.join('/');
};
