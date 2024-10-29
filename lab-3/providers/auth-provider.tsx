// import libs
import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

import { supabase } from '~/utils/supabase';

interface IAuthContext {
  session: Session | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

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

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};
