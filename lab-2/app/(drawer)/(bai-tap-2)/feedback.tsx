import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '~/components/ui/text';

export default function FeedbackModalScreen() {
  const [listQuestions] = useState<string[]>([]);

  return (
    <View className="w-full flex-1">
      <Text className="text-2xl font-bold">Frequently Asked Questions</Text>
      <ScrollView className="flex flex-1">
        {listQuestions.map((item, index) => (
          <View key={index}>
            <Text>Q: {item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
