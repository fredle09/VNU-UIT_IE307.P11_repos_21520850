import { Stack } from 'expo-router';

import { Button } from '~/components/ui/button';
import { Video } from '~/lib/icons/Video';

export default function MediaLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='my-gallery'
        options={{
          title: 'My Gallery',
          headerRight: () => (
            <Button variant='ghost' size='icon'>
              <Video className='size-6 text-black' />
            </Button>
          ),
        }}
      />
      <Stack.Screen name='record-video' />
    </Stack>
  );
}
