import { ScrollView, SafeAreaView, ScrollViewProps } from 'react-native';

import { cn } from '~/lib/utils';

export const Container = ({ className, ...props }: ScrollViewProps) => {
  return (
    <SafeAreaView className={styles.initial}>
      <ScrollView className={cn(styles.initial, className ?? styles.container)} {...props} />
    </SafeAreaView>
  );
};

const styles = {
  initial: 'flex flex-1',
  container: 'p-6',
};
