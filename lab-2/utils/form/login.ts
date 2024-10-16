// import libs
import { toast } from 'sonner-native';
import { z } from 'zod';

// import utils
import { supabase } from '../supabase';

export const DEFAULT_LOGIN_FORM_VALUES = {
  email: '',
  password: '',
};

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
  const promise = new Promise(async (resolve, reject) => {
    const { data: user, error } = await supabase.auth.signInWithPassword(data);
    if (error) return reject(error.message);
    return resolve(user);
  });

  toast.promise(promise, {
    loading: 'Loading...',
    success: (result) => 'Login Sucessful!!!',
    error: (error) => error as string,
  });
};
