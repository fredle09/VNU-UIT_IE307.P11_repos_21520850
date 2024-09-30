// import components
import { useCallback, useId } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from './ui/text';

import { Card, CardHeader } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';

interface IExampleCardProps {
  value: string | React.ReactNode;
  isChoose: boolean;
  setIsChoose: (value: boolean) => void;
}

export const ExampleCardWithCheckbox = ({ value, isChoose, setIsChoose }: IExampleCardProps) => {
  const id = useId();
  const toggleCheckbox = useCallback(() => setIsChoose(!isChoose), []);

  return (
    <TouchableOpacity className="mt-4" activeOpacity={0.9} onPress={toggleCheckbox}>
      <Card>
        <CardHeader className="flex w-full flex-row items-center justify-between">
          {typeof value === 'string' ? <Text className="text-xl">{value}</Text> : value}
          <Checkbox id={id} checked={isChoose} onCheckedChange={setIsChoose} />
        </CardHeader>
      </Card>
    </TouchableOpacity>
  );
};
