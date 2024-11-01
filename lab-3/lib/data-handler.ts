import { z } from 'zod';

import { Tables, TablesInsert, TablesUpdate } from '~/database.types';
import { noteFormSchema } from '~/utils/form/note';
import { supabase } from '~/utils/supabase';

export const getNotes = async () => {
  const { data, error } = await supabase
    .from<'notes', Tables<'notes'>>('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Tables<'notes'>[];
};

export const getNote = async (id: string) => {
  const { data, error } = await supabase
    .from<'notes', Tables<'notes'>>('notes')
    .select('*')
    .eq('id', id);

  if (error) throw error;

  return data[0] as Tables<'notes'> | null;
};

export const addNote = async (data: z.infer<typeof noteFormSchema>) => {
  const { data: returnData, error } = await supabase
    .from('notes')
    .insert<TablesInsert<'notes'>>(data)
    .select();

  if (error) throw error;

  return returnData[0] as Tables<'notes'>;
};

export const editNote = async (data: z.infer<typeof noteFormSchema>, id: string) => {
  const { data: returnData, error } = await supabase
    .from('notes')
    .update<TablesUpdate<'notes'>>(data)
    .eq('id', id)
    .select();

  if (error) throw error;

  return returnData[0] as Tables<'notes'>;
};

export const delNote = async (id: string) => {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw error;
};
