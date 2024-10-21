import * as SwitchPrimitives from '@rn-primitives/switch';
import * as React from 'react';
import { Platform } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { useColorScheme } from '~/lib/useColorScheme';
import { cn } from '~/lib/utils';

const SwitchWeb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer h-6 w-11 shrink-0 cursor-pointer flex-row items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed',
      props.checked ? 'bg-primary' : 'bg-input',
      props.disabled && 'opacity-50',
      className
    )}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-md shadow-foreground/5 ring-0 transition-transform',
        props.checked ? 'translate-x-5' : 'translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
));

SwitchWeb.displayName = 'SwitchWeb';

const RGB_COLORS = {
  off: {
    light: 'rgb(228, 228, 231)',
    dark: 'rgb(39, 39, 42)',
  },
  on: {
    light: 'rgb(24, 24, 27)',
    dark: 'rgb(250, 250, 250)',
  },
} as const;

const THUMB_POSITION = { off: 0, on: 18 };
const ANIMATION_DURATION = 200;

const SwitchNative = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { colorScheme } = useColorScheme();

  const translateX = React.useMemo(
    () => (props.checked ? THUMB_POSITION.on : THUMB_POSITION.off),
    [props.checked]
  );

  const animatedRootStyle = React.useMemo(
    () => ({
      backgroundColor: interpolateColor(
        translateX,
        [THUMB_POSITION.off, THUMB_POSITION.on],
        [RGB_COLORS.off[colorScheme], RGB_COLORS.on[colorScheme]]
      ),
    }),
    [colorScheme, translateX]
  );

  const animatedThumbStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(translateX, { duration: ANIMATION_DURATION }),
        },
      ],
    }),
    [translateX]
  );

  return (
    <Animated.View
      style={animatedRootStyle}
      className={cn('h-8 w-[46px] rounded-full', props.disabled && 'opacity-50')}>
      <SwitchPrimitives.Root
        className={cn(
          'h-8 w-[46px] shrink-0 flex-row items-center rounded-full border-2 border-transparent',
          className
        )}
        {...props}
        ref={ref}>
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb className="size-7 rounded-full bg-background shadow-md shadow-foreground/25 ring-0" />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
});

SwitchNative.displayName = 'SwitchNative';

const Switch = Platform.select({
  web: SwitchWeb,
  default: SwitchNative,
});

export { Switch };
