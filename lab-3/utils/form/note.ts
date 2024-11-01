// import libs
import { z } from 'zod';

export const DEFAULT_NOTE_FORM_VALUES = {
  title: '',
  content: '',
};

export const noteFormSchema = z.object({
  title: z.string().min(1, "This field can't be empty"),
  content: z.string().min(1, "This field can't be empty"),
});
