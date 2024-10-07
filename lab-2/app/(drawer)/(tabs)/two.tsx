import { Stack } from 'expo-router';

import { Container } from '~/components/container';
import { ScreenContent } from '~/components/screen-content';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/two.tsx" title="Tab Two" />
      </Container>
    </>
  );
}
