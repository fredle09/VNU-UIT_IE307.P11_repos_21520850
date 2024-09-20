// import libs
import { z } from "zod";

// import utils
import { supabase } from "../supabase";

export const DEFAULT_LOGIN_FORM_VALUES = {
  email: "",
  password: "",
};

export const loginFormSchema = z
  .object({
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })

export const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
  const { data: user, error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.error(">> error in login:", error.message);
    throw error;
  }

  return data;
}