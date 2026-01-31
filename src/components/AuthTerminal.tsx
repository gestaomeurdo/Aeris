"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Terminal, ChevronRight, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Mantemos onSuccess, mas o login real acontece via link
}

const AuthTerminal = ({ isOpen, onClose, onSuccess }: AuthTerminalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Usamos o email fixo para garantir que apenas o operador Mike possa logar
    if (email !== "mike@aeris.academy") {
      setMessage("ACESSO NEGADO: Identificação de operador inválida.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(`Falha no Uplink: ${error.message}`);
      setMessage(`ERRO: Falha ao enviar link. ${error.message}`);
    } else {
      setMessage("UPLINK INICIADO: Verifique seu email para o link de acesso tático.");
      toast.info("Link de acesso enviado. Verifique seu email.");
      onClose();
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#020617] border border-[#00E5FF]/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,229,255,0.1)]"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#00E5FF]" />
                <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">SECURITY OVERRIDE: MAGIC LINK</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-black text-white/20 uppercase tracking-widest pl-1">Identification</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
                    <input
                      autoFocus
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="OPERATOR_ID (e.g., mike@aeris.academy)"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/5 outline-none focus:border-[#00E5FF]/40 transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              {message && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-xl text-center ${message.includes('ERRO') || message.includes('NEGADO') ? 'bg-red-500/10 border border-red-500/20' : 'bg-[#00E5FF]/10 border border-[#00E5FF]/20'}`}
                >
                  <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${message.includes('ERRO') || message.includes('NEGADO') ? 'text-red-500' : 'text-[#00E5FF]'}`}>{message}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'TRANSMITTING...' : 'Initiate Magic Link Uplink'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="px-10 pb-8 text-center">
              <p className="text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">Biometric bypass disabled for this terminal</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthTerminal;