import { Stack, Link } from 'expo-router';

import { Container } from '~/components/container';
import { ScreenContent } from '~/components/screen-content';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Welcome' }} />
      <Container>
        {/* <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild> */}
        <ScreenContent path="app/index.tsx" title="Home" />
        <Link
          className="mt-2"
          href={{ pathname: '/(auth)/login' }}
          asChild
        >
          <Button><Text>Login</Text></Button>
        </Link>
        <Link
          className="mt-2"
          href={{ pathname: '/(auth)/register' }}
          asChild
        >
          <Button variant={"outline"}>
            <Text>Register</Text>
          </Button>
        </Link>
        <Link
          className="mt-2"
          href={{ pathname: '/(user)/calculate' }}
          asChild
        >
          <Button variant={"ghost"}>
            <Text>Calculate</Text>
          </Button>
        </Link>
      </Container>
    </>
  );
}
