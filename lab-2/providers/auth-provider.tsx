// /* eslint-disable prettier/prettier */
// import libs
import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner-native';

import { supabase } from '~/utils/supabase';

interface ICredentials {
  email: string;
  password: string;
}

interface ISignUpCredentials extends ICredentials {
  name: string;
}

interface IAuthContext {
  isPending: boolean;
  session: Session | null;
  signInWithPassword: (credentials: ICredentials) => Promise<void>;
  signUpWithPassword: (signUpCredentials: ISignUpCredentials) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  isPending: false,
  session: null,
  signInWithPassword: async () => { },
  signUpWithPassword: async () => { },
});

const signInWithPassword = async (credentials: ICredentials) => {
  // Implement sign in with email and password
  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error) toast.error(error.message);
};

const signUpWithPassword = async ({ email, password, name }: ISignUpCredentials) => {
  // Implement sign up with email and password
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) toast.error(error.message);
  if (!session) toast.info('Please check your inbox for email verification!');
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isPending: false,
        session,
        signInWithPassword,
        signUpWithPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
