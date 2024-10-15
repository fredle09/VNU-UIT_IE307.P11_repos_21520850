import { Image, View, Pressable, Text, isTextChildren } from '@rn-primitives/slot';
import React, { ForwardedRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { mergeProps } from '~/lib/utils';

const Input = React.forwardRef<TextInput, TextInputProps>(
  (props, forwardedRef: ForwardedRef<TextInput>) => {
    const { children, ...inputSlotProps } = props;

    if (!React.isValidElement(children)) {
      console.log('Slot.Input - Invalid asChild element', children);
      return null;
    }

    return React.cloneElement(isTextChildren(children) ? <></> : children, {
      ...mergeProps(inputSlotProps, children.props || {}),
      ref: forwardedRef,
    });
  }
);

Input.displayName = 'SlotInput';

// Export components
export { Image, View, Input, Pressable, Text, isTextChildren };
