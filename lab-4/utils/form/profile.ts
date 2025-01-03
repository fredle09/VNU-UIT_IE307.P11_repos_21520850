import { z } from 'zod';

export const DEFAULT_PROFILE_FORM_VALUES = {
  name: '',
  email: '',
  phone: '',
  house_number: '',
  street: '',
  city: '',
};

export const profileFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name must be at least 3 characters long.' }),
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
    phone: z
      .string()
      .optional()
      .refine(
        (phone) => !phone || /^\d{10}$/.test(phone),
        { message: 'This phone number must be exactly 10 digits.' }
      ),
    house_number: z
      .string()
      .optional(),
    street: z
      .string()
      .optional(),
    city: z
      .string()
      .optional(),
  });
