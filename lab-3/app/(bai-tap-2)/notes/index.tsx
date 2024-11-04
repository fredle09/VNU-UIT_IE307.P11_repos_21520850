import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { toast } from 'sonner-native';
import useSWR, { Fetcher, useSWRConfig } from 'swr';

import { StateButton } from '~/components/customize-ui/state-button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Text } from '~/components/ui/text';
import { Database, Tables } from '~/database.types';
import { delNote, getNotes } from '~/lib/data-handler';
import { BadgePlus } from '~/lib/icons/BadgePlus';
import { Trash2 } from '~/lib/icons/Trash2';
import { useColorScheme } from '~/lib/useColorScheme';

const fetcher: Fetcher<Tables<'notes'>[], keyof Database['public']['Tables']> = async (table) => {
  return await getNotes();
};

export default function NotesIndexScreen() {
  const { data, isLoading, error, mutate } = useSWR('notes', fetcher);
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkColorScheme } = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await mutate(); // Re-fetch data using SWR
    setRefreshing(false);
  }, []);

  const { mutate: globalMutate } = useSWRConfig();

  const onDelete = useCallback(async (id: string) => {
    try {
      await delNote(id);
      await Promise.all([
        globalMutate('notes', (prev: (Tables<'notes'> | null)[] | undefined) =>
          prev?.filter((item) => item?.id !== id)
        ),
      ]);
      toast.info('Delete notes successful!!!');
    } catch (error: any) {
      const message = error?.message || 'Unknown Error';
      console.error('>> [EditNoteScreen]: Error in onDelete:', message);
      toast.error(message);
    }
  }, []);

  return (
    <>
      <FlatList
        className="px-6 py-2"
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="flex flex-row items-center justify-between pb-4">
            <Text>All Notes</Text>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-row gap-2"
              onPress={() => router.push('/(bai-tap-2)/notes/add')}>
              <BadgePlus className="text-black dark:text-white" />
            </Button>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={isDarkColorScheme ? ['#fff'] : ['#000']}
            tintColor={isDarkColorScheme ? '#fff' : '#000'}
          />
        }
        ListEmptyComponent={
          refreshing || isLoading || error ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="mb-4 min-h-32 w-full" />
              ))}
            </>
          ) : (
            <Text className="text-center">No notes found!</Text>
          )
        }
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => !isDeleting && router.push(`/(bai-tap-2)/notes/edit?id=${item.id}`)}>
            <Card className="mb-4">
              <View className="flex flex-row items-center justify-between pr-3">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <StateButton
                  variant="destructive"
                  size="icon"
                  onPress={() => {
                    setIsOpen(true);
                    setIdToDelete(item.id);
                  }}
                  disabled={isLoading || error || isDeleting}>
                  <Trash2 className="text-white" />
                </StateButton>
              </View>
              <CardContent>
                <Text numberOfLines={2} ellipsizeMode="tail" className="text-ellipsis">
                  {item.content}
                </Text>
              </CardContent>
            </Card>
          </TouchableWithoutFeedback>
        )}
      />

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onPress={() => {
                setIsOpen(false);
                setIdToDelete(null);
              }}>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction
              onPress={() => {
                setIsOpen(false);
                if (!idToDelete) return;
                setIsDeleting(true);
                toast.promise(onDelete(idToDelete), {
                  loading: 'Deleting...',
                  success: () => {
                    setIsDeleting(false);
                    return 'Deleted successfully';
                  },
                  error: () => {
                    setIsDeleting(false);
                    return 'Failed to delete';
                  },
                });
              }}>
              <Text>Continue</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
