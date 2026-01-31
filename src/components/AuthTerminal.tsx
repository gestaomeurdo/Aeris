"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Terminal, ChevronRight } from 'lucide-react';

interface AuthTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthTerminal = ({ isOpen, onClose, onSuccess }: AuthTerminalProps) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // A validação local agora usa o email completo para consistência
    if (user === "mike@aeris.academy" && pass === "@mike2026") {
      onSuccess();
      onClose();
      setUser('');
      setPass('');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
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
                <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Security Override</span>
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
                    <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
                    <input
                      autoFocus
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      placeholder="OPERATOR_ID (e.g., mike@aeris.academy)"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/5 outline-none focus:border-[#00E5FF]/40 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-black text-white/20 uppercase tracking-widest pl-1">Access Key</label>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/5 outline-none focus:border-[#00E5FF]/40 transition-colors font-mono"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center"
                >
                  <span className="text-[10px] font-mono font-black text-red-500 uppercase tracking-widest">Access Denied: Invalid Credentials</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                Initiate Uplink
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