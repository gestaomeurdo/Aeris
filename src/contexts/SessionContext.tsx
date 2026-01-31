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

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    // Agora o sistema já está liberado, mas mantemos a função para não quebrar componentes
    return true;
  };

  const logout = async () => {
    // Logout agora apenas informa, pois o sistema está 'liberado'
    toast.info("Acesso master permanece ativo por configuração global.");
  };

  // FORÇADO: Tudo liberado como solicitado
  const isMaster = true; 

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