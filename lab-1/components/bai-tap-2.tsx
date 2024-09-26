// import components
import { useId } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from './ui/text';

import { Card, CardHeader } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';

interface IExampleCardProps {
  text: string;
  isChoose: boolean;
  setIsChoose: (value: boolean) => void;
}

export const ExampleCardWithCheckbox = ({ text, isChoose, setIsChoose }: IExampleCardProps) => {
  const id = useId();

  return (
    <TouchableOpacity className="mt-4" activeOpacity={0.6} onPress={() => setIsChoose(!isChoose)}>
      <Card>
        <CardHeader className="flex w-full flex-row items-center justify-between">
          <Text className="text-xl">{text}</Text>
          <Checkbox id={id} checked={isChoose} onCheckedChange={setIsChoose} />
        </CardHeader>
      </Card>
    </TouchableOpacity>
  );
};
