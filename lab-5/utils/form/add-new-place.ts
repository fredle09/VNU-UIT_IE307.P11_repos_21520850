import { z } from 'zod';

export const DEFAULT_ADD_NEW_PLACE_FORM_VALUES = {
  title: '',
  imageUri: '',
  coordinates: [],
};

export const addNewPlaceFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  imageUri: z.string().min(1, { message: 'This field has to be filled.' }),
  locate: z.object({
    coordinates: z.array(z.number()).length(2, { message: 'This field has to be filled.' }),
    address: z.string().min(1, { message: 'This field has to be filled.' }),
  }),
});
