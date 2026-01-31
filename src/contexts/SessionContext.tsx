"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
  isMaster: boolean;
  loginMaster: (user: string, pass: string) => boolean;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const MASTER_KEY = "@mike2026";
const MASTER_USER = "mike";

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMaster, setIsMaster] = useState(false); // Inicia sempre como falso

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loginMaster = (user: string, pass: string) => {
    if (user.toLowerCase() === MASTER_USER && pass === MASTER_KEY) {
      setIsMaster(true);
      toast.success("ACESSO MASTER CONCEDIDO. Privilégios de edição ativados.");
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsMaster(false);
    toast.info("Sessão Master encerrada.");
  };

  return (
    <SessionContext.Provider value={{ session, isLoading, isMaster, loginMaster, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};