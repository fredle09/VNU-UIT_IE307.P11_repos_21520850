import { router, Stack } from 'expo-router';
import React from 'react';

import { Button } from '~/components/ui/button';
import { BadgePlus } from '~/lib/icons/BadgePlus';

export default function NotesLayoutScreen() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Notes' }} />
      <Stack.Screen name="add" options={{ title: 'Add Notes' }} />
      <Stack.Screen name="edit" options={{ title: 'Edit Notes' }} />
    </Stack>
  );
}
