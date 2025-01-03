import * as React from 'react';
import * as Slot from '@rn-primitives/slot';

import { SlottableTextProps, TextRef } from '@rn-primitives/types';

import { Text as RNText } from 'react-native';
import { cn } from '~/lib/utils';
import { useFontSize } from '~/providers';

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextSize =
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl';

const sizeFontSizeMultiplier: Record<NonNullable<TextSize>, number> = {
  'text-xs': 0.75,
  'text-sm': 0.875,
  'text-base': 1,
  'text-lg': 1.125,
  'text-xl': 1.25,
  'text-2xl': 1.5,
  'text-3xl': 1.875,
};

// Define a line height multiplier for each text size
const sizeLineHeightMultiplier: Record<NonNullable<TextSize>, number> = {
  'text-xs': 1,
  'text-sm': 1.25,
  'text-base': 1.5,
  'text-lg': 1.75,
  'text-xl': 1.75,
  'text-2xl': 2,
  'text-3xl': 2.25,
};

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    const { fontSize } = useFontSize();

    const sizeClass = ((textClass && className
      ? `${textClass} ${className}`
      : (textClass ?? className)
    )
      ?.split(' ')
      .reverse()
      .find((cls) => cls in sizeFontSizeMultiplier) || 'text-base') as TextSize;
    const fontSizeMultiplier = sizeFontSizeMultiplier[sizeClass];
    const lineHeightMultiplier = sizeLineHeightMultiplier[sizeClass];
    const adjustedFontSize = fontSize * fontSizeMultiplier;
    const adjustedLineHeight = fontSize * lineHeightMultiplier;

    return (
      <Component
        className={cn('text-foreground web:select-text', textClass, className)}
        ref={ref}
        style={{
          fontFamily: `${textClass} ${className}`.indexOf('font-bold') !== -1 ? 'bold' : 'regular',
          fontSize: adjustedFontSize,
          lineHeight: adjustedLineHeight,
        }}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };
