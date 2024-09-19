// import components
import { SafeAreaView } from 'react-native';

// import utils
import { cn } from '~/lib/utils';

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <SafeAreaView className={cn(styles.container, className)}>{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 m-6',
};
