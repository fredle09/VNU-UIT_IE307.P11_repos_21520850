import { useCallback, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { toast } from 'sonner-native';

import { DarkSwitch } from '~/components/customize-ui/dark-switch';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { useColorScheme } from '~/lib/useColorScheme';

export default function BaiTap2Screen() {
  const { toggleColorScheme } = useColorScheme();
  const [isNotification, setIsNotification] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const toggleIsNotification = useCallback(() => setIsNotification((prev) => !prev), []);

  const normalizeText = useCallback((text: string) => text.trim().replace(/\s+/g, ' '), []);

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [listQuestions, setListQuestions] = useState<string[]>([]);
  const addQuestion = useCallback((value: string) => {
    !!value && setListQuestions((prev) => [...new Set([normalizeText(value), ...prev])]);
  }, []);

  const handleSubmit = useCallback(
    (isNotification: boolean, currentQuestion: string) => {
      Keyboard.dismiss();
      if (isNotification) {
        setIsTyping(false);
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
          loading: 'Sending feedback...',
          success: (_data) => {
            setIsTyping(true);
            addQuestion(currentQuestion);
            setCurrentQuestion('');
            return 'Thank you for your feedback!';
          },
          error: () => {
            setIsTyping(true);
            return 'Failed to send feedback.';
          },
        });
      } else {
        addQuestion(currentQuestion);
        setCurrentQuestion('');
      }
    },
    [addQuestion]
  );

  return (
    <KeyboardAvoidingView
      className="my-4 flex flex-1 flex-col px-4"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex flex-1 flex-col items-center justify-start gap-4">
          <View className="flex flex-col gap-2">
            <Image
              className="size-32 rounded-full"
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            <Text>React Native App</Text>
          </View>
          <View className="flex">
            <Text className="text-2xl font-bold">Settings</Text>
            <Button
              variant="ghost"
              size="lg"
              className="flex w-full flex-row items-center justify-between !px-4"
              onPress={toggleColorScheme}>
              <Text>Dark Mode</Text>
              <DarkSwitch />
              {/* <Switch checked={isDarkColorScheme} onCheckedChange={toggleColorScheme} /> */}
              {/* <Switch value={isDarkColorScheme} onValueChange={toggleColorScheme} /> */}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="flex w-full flex-row items-center justify-between !px-4"
              onPress={toggleIsNotification}>
              <Text>Notifications</Text>
              <Switch checked={isNotification} onCheckedChange={setIsNotification} />
              {/* <Switch value={isNotification} onValueChange={setIsNotification} /> */}
            </Button>
          </View>
          <View className="flex w-full flex-col gap-2">
            <Text className="text-2xl font-bold">Feedback</Text>
            <Textarea
              editable={isTyping}
              placeholder="Enter your feedback"
              value={currentQuestion}
              onChangeText={setCurrentQuestion}
            />
            <Button
              variant="default"
              size="lg"
              disabled={!isTyping || !currentQuestion}
              onPress={() => handleSubmit(isNotification, currentQuestion)}>
              <Text>Send Feedback</Text>
            </Button>
          </View>
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
