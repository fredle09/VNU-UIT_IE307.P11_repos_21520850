// import libs
import { useContext } from 'react';
import { Stack, Link } from 'expo-router';

// import components
import { Container } from '~/components/container';
import { ScreenContent } from '~/components/screen-content';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

// import utils
import { AuthContext } from '~/provider/auth-provider';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Stack.Screen options={{ title: 'Welcome' }} />
      <Container>
        {/* <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild> */}
        <ScreenContent path="app/index.tsx" title="Home" />

        {!user
          ? <>
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
          </>
          : <>
            <Link
              className="mt-2"
              href={{ pathname: '/(user)/calculate' }}
              asChild
            >
              <Button>
                <Text>Calculate</Text>
              </Button>
            </Link>

            <Button
              className='mt-2'
              variant="ghost"
              onPress={async () => {
                const { error } = await supabase.auth.signOut();
              }}
            >
              <Text>Exit</Text>
            </Button>
          </>}
      </Container>
    </>
  );
}
