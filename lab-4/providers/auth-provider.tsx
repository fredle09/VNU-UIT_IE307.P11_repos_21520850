import { Session } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { supabase } from '~/utils/supabase';

interface IAuthContext {
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuthSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthSession must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading as true
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, [setSession]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false); // Set loading to false after fetching
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading, signOut }}>{children}</AuthContext.Provider>
  );
};
