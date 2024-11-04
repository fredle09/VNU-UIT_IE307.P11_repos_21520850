import { router } from 'expo-router';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { StateButton } from './customize-ui/state-button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { Text } from '~/components/ui/text';
import { Tables } from '~/database.types';
import { Trash2 } from '~/lib/icons/Trash2';

export const NoteCard = (
  props: Tables<'notes'> & {
    disabled?: boolean;
    onDelete?: () => void;
  }
) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => !props.disabled && router.push(`/(bai-tap-2)/notes/edit?id=${props.id}`)}>
      <Card className="mb-4">
        <View className="flex flex-row items-center justify-between pr-3">
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
          </CardHeader>
          <StateButton
            variant="destructive"
            size="icon"
            onPress={props.onDelete}
            disabled={props.disabled}>
            <Trash2 className="text-white" />
          </StateButton>
        </View>
        <CardContent>
          <Text numberOfLines={2} ellipsizeMode="tail" className="text-ellipsis">
            {props.content}
          </Text>
        </CardContent>
      </Card>
    </TouchableWithoutFeedback>
  );
};
