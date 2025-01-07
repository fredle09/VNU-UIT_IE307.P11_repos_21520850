import { Session } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { supabase } from '~/utils/supabase';

interface IAuthContext {
  session: Session | null;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuthSession = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthSession must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading as true
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, [setSession]);

  const refreshUser = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (data) {
        // Update session user with fresh data
        setSession((prev) => {
          if (prev) {
            return { ...prev, user: data.user };
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error refreshing user info:', error);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
