// import libs
import React, { useState } from "react";

// import components
import { TextInput } from "react-native";
import { View } from "react-native";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeShow } from "~/lib/icons/eye-show";
import { EyeOff } from "~/lib/icons/eye-off";

// import utils
import { cn } from "~/lib/utils";

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View className="relative">
      <Input
        ref={ref}
        className={cn("pr-10", className)}
        secureTextEntry={showPassword}
        {...props}
      />
      <Button
        className="absolute top-1 right-1"
        size="icon" variant="ghost"
        onPress={() => setShowPassword(prev => !prev)}
      >
        {showPassword
          ? <EyeShow className="size-6 text-black" />
          : <EyeOff className="size-6 text-black" />}
      </Button>
    </View>
  )
})

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };