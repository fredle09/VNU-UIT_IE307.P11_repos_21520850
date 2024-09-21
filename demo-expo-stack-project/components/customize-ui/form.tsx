// import libs
import { useId } from "react"
import {
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  type UseFormStateReturn,
  type ControllerProps,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// import components
import { View } from "react-native"
import { Label } from "../ui/label"
import { Text } from "../ui/text"

type TFormController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Omit<ControllerProps<TFieldValues, TName>, "render">
  & {
    render: (props: {
      field: ControllerRenderProps<TFieldValues, TName> & { nativeID: string };
      fieldState: ControllerFieldState;
      formState: UseFormStateReturn<TFieldValues>;
    }) => React.ReactElement;
    className?: string,
    label: string,
    errors: FieldErrors<TFieldValues>
  }
) => import("react").ReactElement<any, string
  | import("react").JSXElementConstructor<any>>

const FormController: TFormController = ({ className, label, control, name, render, errors }) => {
  const nativeID = useId();
  return <View className={className ?? "mb-4"}>
    <Label nativeID={nativeID}>{label}</Label>
    <Controller
      control={control}
      name={name}
      render={({ field, ...props }) =>
        render({ field: { nativeID, ...field }, ...props })}
    />
    {errors[name]
      && <Text className="text-red-500">
        {errors[name]?.message as string}
      </Text>}
  </View>
}

export { FormController }