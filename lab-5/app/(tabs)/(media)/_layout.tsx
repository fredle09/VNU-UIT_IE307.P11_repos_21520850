import { router, Stack } from 'expo-router';

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
            <Button
              variant='ghost'
              size='icon'
              onPressIn={() => router.push('/(tabs)/(media)/record-video')}>
              <Video className='size-6 text-black' />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name='record-video'
        options={{
          title: 'Record Video',
        }}
      />
    </Stack>
  );
}
