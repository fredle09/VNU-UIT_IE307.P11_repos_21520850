import { Stack } from 'expo-router';

import { Container } from '~/components/container';
import { ScreenContent } from '~/components/screen-content';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/index.tsx" title="Tab One" />
      </Container>
    </>
  );
}
