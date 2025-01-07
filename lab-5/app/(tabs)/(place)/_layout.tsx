import { router, Stack } from 'expo-router';

import { Button } from '~/components/ui/button';
import { CirclePlus } from '~/lib/icons/CirclePlus';

export default function PlaceLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Place',
          headerRight: () => (
            <Button variant='ghost' size='icon' onPressIn={() => router.push('/add-new-place')}>
              <CirclePlus className='size-6 text-black dark:text-white' />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name='add-new-place'
        options={{
          title: 'Add New Place',
        }}
      />
      <Stack.Screen name='place-detail/[id]' />
      <Stack.Screen name='view-on-map' options={{ title: 'View on Map' }} />
    </Stack>
  );
}
