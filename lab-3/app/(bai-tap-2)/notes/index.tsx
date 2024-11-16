import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { toast } from 'sonner-native';
import useSWR, { Fetcher } from 'swr';

import { NoteCard } from '~/components/bai-tap-2';
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
import { Skeleton } from '~/components/ui/skeleton';
import { Text } from '~/components/ui/text';
import { Database, Tables } from '~/database.types';
import { delNote, getNotes } from '~/lib/data-handler';
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

  const onDelete = useCallback(async (id: string) => {
    try {
      await delNote(id);
      await mutate((prev) => prev?.filter((item) => item?.id !== id));
    } catch (error: any) {
      const message = error?.message || 'Unknown Error';
      console.error('>> [EditNoteScreen]: Error in onDelete:', message);
    }
  }, []);

  return (
    <>
      <FlatList
        className="px-6 py-6"
        data={data}
        keyExtractor={(item) => item.id}
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
          <NoteCard
            {...item}
            disabled={isLoading || error || isDeleting}
            onDelete={() => {
              setIsOpen(true);
              setIdToDelete(item.id);
            }}
          />
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
