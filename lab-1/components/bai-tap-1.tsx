// import libs
import { Image } from 'expo-image';
import { useState } from 'react';
import { View } from 'react-native';
import { toast } from 'sonner-native';

// import components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Text } from './ui/text';
import { Heart } from '../lib/icons/Heart';
import { MessageCircle } from '../lib/icons/MessageCircle';
import { Repeat2 } from '../lib/icons/Repeat2';

interface TThreadPostProps {
  _id: string;
  currentLikes: number;
  isLiked: boolean;
  currentComments: number;
  currentReposts: number;
  isReposted: boolean;
  content: string;
  name: string;
  userImg: string;
  image?: {
    uri: string;
    width: number;
    height: number;
  };
}

export const ThreadPost = (props: TThreadPostProps) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const toggleLiked = () => setIsLiked((prev) => !prev);

  const [isDisableComment, setIsDisableComment] = useState(false);
  const [countYourComment, setCountYourComment] = useState(0);
  const postComment = () => {
    setIsDisableComment(true);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() * 3 > 1) {
          return resolve('Comment posted!');
        } else {
          const error = new Error('Error while posting comment!');
          return reject(error);
        }
      }, 1000);
    });

    toast.promise(promise, {
      loading: 'Posting comment...',
      success: (data) => {
        setIsDisableComment(false);
        setCountYourComment((prev) => prev + 1);
        return data;
      },
      error: (err) => {
        setIsDisableComment(false);
        return (err as Error).message;
      },
    });
  };

  const [isReposted, setIsReposted] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const toggleRepost = () => {
    if (!isReposted) {
      toast.success('Reposted!');
      setIsReposted(true);
    } else {
      setIsAlertOpen(true);
    }
  };

  return (
    <View className="border-b-2 border-zinc-100 p-4 dark:border-zinc-900">
      {isReposted && (
        <View className="flex flex-row gap-4 py-2 pt-0">
          <View className="w-10" />
          <View className="flex flex-row gap-2">
            <Repeat2 className="text-zinc-700" />
            <Text>Reposted</Text>
          </View>
        </View>
      )}
      <View className="flex flex-row gap-4">
        <Avatar alt={`${props.name}'s avatar`}>
          <AvatarImage source={{ uri: props.userImg }} />
          <AvatarFallback>
            <Text>{props.name[0]}</Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-1 items-start gap-2">
          <Text className="font-bold">{props.name}</Text>
          <Text>{props.content}</Text>
          {props.image && (
            <View className="mt-2 h-fit w-full overflow-hidden rounded-lg border-2 border-zinc-100 dark:border-zinc-900">
              <Image
                style={{ width: '100%', aspectRatio: 16 / 9 }}
                className="h-full w-full rounded-lg"
                source={{ uri: props.image.uri }}
                placeholder={{
                  blurhash: '008|^l',
                  width: 30,
                  height: 20,
                }}
              />
            </View>
          )}
          <View className="flex flex-row gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="flex flex-row items-center justify-center gap-1 p-1 px-1.5"
              onPress={toggleLiked}>
              <Heart className={isLiked ? 'fill-red-700 text-red-700' : 'text-zinc-700'} />
              <Text>{props.currentLikes + (isLiked ? 1 : 0)}</Text>
            </Button>
            <Button
              disabled={isDisableComment}
              size="sm"
              variant="ghost"
              className="flex flex-row items-center justify-center gap-1 p-1 px-1.5"
              onPress={postComment}>
              <MessageCircle className="text-zinc-700" />
              <Text>{props.currentComments + countYourComment}</Text>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex flex-row items-center justify-center gap-1 p-1 px-1.5"
              onPress={toggleRepost}>
              <Repeat2 className="text-zinc-700" />
              <Text>{props.currentReposts + (isReposted ? 1 : 0)}</Text>
            </Button>
          </View>
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Do you want to stop reposting?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will stop your content from being reposted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Text>Cancel</Text>
                </AlertDialogCancel>
                <AlertDialogAction onPress={() => setIsReposted(false)}>
                  <Text>Continue</Text>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      </View>
    </View>
  );
};

export const ThreadPostSkeleton = () => {
  return (
    <View className="flex flex-row gap-4 border-b-2 border-zinc-100 p-4 dark:border-zinc-900">
      <Skeleton className="size-12 rounded-full" />

      <View className="flex-1 flex-col items-start gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />

        <Skeleton className="mt-2 aspect-video w-full" />

        <View className="flex flex-row gap-2">
          <Skeleton className="aspect-video h-10" />
          <Skeleton className="aspect-video h-10" />
          <Skeleton className="aspect-video h-10" />
        </View>
      </View>
    </View>
  );
};
