import { Session } from '@supabase/supabase-js';
import React, { createContext, useState, useEffect } from 'react';

import { supabase } from '~/utils/supabase';

type ContextProps = {
  user: null | boolean;
  session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<null | boolean>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(!!session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Supabase auth event: ${event}`);
      setSession(session);
      setUser(!!session);
    });

    return () => {
      subscription.unsubscribe(); // Call unsubscribe on the subscription object
    };
  }, []);

  return <AuthContext.Provider value={{ user, session }}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
