import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function NotificationPage() {
  return (
    <View className="my-4 flex flex-1 flex-col items-center justify-center px-4">
      <Text>Notification Page</Text>
      <Button onPress={() => router.push('/notification-details')}>
        <Text>Go to Notification Details</Text>
      </Button>
    </View>
  );
}
