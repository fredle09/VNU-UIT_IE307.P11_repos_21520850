// import libs
import { useId } from "react"
import {
  Controller,
  type ControllerProps,
  type FieldErrors,
  type FieldPath,
  type FieldValues
} from "react-hook-form"

// import components
import { View } from "react-native"
import { Label } from "../ui/label"
import { Text } from "../ui/text"

type TFormController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>
  & {
    className?: string,
    label: string,
    errors: FieldErrors<TFieldValues>
  }
) => import("react").ReactElement<any, string
  | import("react").JSXElementConstructor<any>>

const FormController: TFormController = ({ className, label, control, name, render, errors }) => {
  const id = useId();
  return <View className={className ?? "mb-4"}>
    <Label nativeID={id}>{label}</Label>
    <Controller
      control={control}
      name={name}
      render={render}
    />
    {errors[name]
      && <Text className="text-red-500">
        {errors[name]?.message as string}
      </Text>}
  </View>
}

export { FormController }