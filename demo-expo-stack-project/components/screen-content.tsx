import { Text, View } from 'react-native';

import { EditScreenInfo } from './edit-screen-info';
import { useContext } from 'react';
import { AuthContext } from '@/provider/auth-provider';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const { user, session } = useContext(AuthContext);

  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      <Text>User: {user ? "Auth" : "Unauth"}</Text>
      <Text>Session: {JSON.stringify(session?.user?.email)}</Text>
      {children}
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
