import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className={styles.container}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex flex-1 m-6',
};
