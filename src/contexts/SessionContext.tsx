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
  const [isMasterInternal, setIsMasterInternal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se o modo master estava ativo no localStorage
    const savedMaster = localStorage.getItem('aeris_master_active') === 'true';
    if (savedMaster) setIsMasterInternal(true);

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
    if (user.toLowerCase() === 'mike' && pass === 'mike2026') {
      setIsMasterInternal(true);
      localStorage.setItem('aeris_master_active', 'true');
      toast.success("ACESSO MASTER CONCEDIDO: Bem-vindo de volta, Operador Mike.");
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsMasterInternal(false);
    localStorage.removeItem('aeris_master_active');
    await supabase.auth.signOut();
    toast.info("Sessão encerrada.");
  };

  // O usuário é Master se estiver logado via Supabase OU via modo Master manual
  const isMaster = !!session || isMasterInternal;

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