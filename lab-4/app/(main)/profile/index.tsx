import { useCallback } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { toast } from 'sonner-native';

import { StateButton } from '~/components/customize-ui/state-button';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { useAuthSession } from '~/providers/auth-provider';
import { UserRoundPen } from '~/lib/icons/UserRoundPen';
import { router } from 'expo-router';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function BaiTap3ProfileScreen() {
  const { session, signOut: _signOut } = useAuthSession();
  const profile = session?.user?.user_metadata;

  const signOut = useCallback(async () => {
    try {
      await _signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('An unexpected error occurred while signing out');
        return;
      }

      toast.error(`Error signing out: ${error?.message}`);
    }
  }, []);

  return (
    <SafeAreaView className={cn(Platform.OS === "android" ? "pt-16" : "", "my-4 flex flex-1 flex-col justify-start mx-4 gap-4")}>
      <View className="flex flex-row items-center">
        <Avatar alt={profile?.name} className="size-32">
          <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
          <AvatarFallback>
            <Text>{profile?.name?.[0]}</Text>
          </AvatarFallback>
        </Avatar>
        <Text className='font-bold text-xl ml-4 mr-auto'>{profile?.name}</Text>
        <Button variant="outline" size="icon" onPress={() => router.push('/(main)/profile/edit')}>
          <UserRoundPen className="size-6 text-black" />
        </Button>
      </View>
      <View>
        <Text className="text-xl text-bold">Name</Text>
        <Text>{profile?.name}</Text>
      </View>
      <View>
        <Text className="text-xl text-bold">Email</Text>
        <Text>{profile?.email}</Text>
      </View>
      <View>
        <Text className="text-xl text-bold">Phone</Text>
        {profile?.phone
          ? <Text>{profile?.phone}</Text>
          : <Text>You're already setup this field</Text>}
      </View>
      <View>
        <Text className="text-xl text-bold">Address</Text>
        {profile?.house_number && profile?.street && profile?.city
          ? <Text>{`${profile?.house_number}, ${profile?.street}, ${profile?.city}`}</Text>
          : <Text>You're already setup this field</Text>}
      </View>
      <StateButton onPress={signOut} variant="destructive">
        <Text>Sign Out</Text>
      </StateButton>
    </SafeAreaView>
  );
}
