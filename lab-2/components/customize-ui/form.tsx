import React, { useId } from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { View, ViewProps } from 'react-native';

// Import components
import { Label } from '../ui/label';
import { Text } from '../ui/text';

const Form = FormProvider;

const FormController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  name,
  render,
  className = 'mt-4',
  ...props
}: ControllerProps<TFieldValues, TName> & ViewProps & { label: string }) => {
  const nativeID = useId();
  const { control, getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <View className={className} {...props}>
      <Label nativeID={nativeID}>{label}</Label>
      <Controller {...{ name, control, render }} />
      {fieldState?.error?.message && (
        <Text style={{ fontSize: 12, color: 'red' }}>{fieldState.error.message}</Text>
      )}
    </View>
  );
};

export { Form, FormController };
