import { router, Stack } from 'expo-router';
import React from 'react';

import { Button } from '~/components/ui/button';
import { BadgePlus } from '~/lib/icons/BadgePlus';

export default function NotesLayoutScreen() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Notes',
          headerRight: () => (
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-row gap-2"
              onPress={() => router.push('/(bai-tap-2)/notes/add')}>
              <BadgePlus className="text-black dark:text-white" />
            </Button>
          ),
        }}
      />
      <Stack.Screen name="add" options={{ title: 'Add Notes' }} />
      <Stack.Screen name="edit" options={{ title: 'Edit Notes' }} />
    </Stack>
  );
}
