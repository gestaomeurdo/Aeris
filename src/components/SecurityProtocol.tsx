"use client";

import React, { useState } from 'react';
import { Shield, Lock, Unlock, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface SecurityProtocolProps {
  isMaster: boolean;
  onLogin: (status: boolean) => void;
}

const SecurityProtocol = ({ isMaster, onLogin }: SecurityProtocolProps) => {
  const [attempt, setAttempt] = useState('');

  const handleLogin = () => {
    const user = prompt("IDENTIFICAÇÃO DO OPERADOR:");
    const pass = prompt("CHAVE DE ACESSO:");
    
    if (user === "mike" && pass === "@mike2026") {
      onLogin(true);
    } else {
      alert("ACESSO NEGADO: Credenciais de segurança inválidas.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20">
      <div className="bg-black/40 border border-white/5 rounded-[40px] p-16 flex flex-col items-center text-center gap-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />
        
        <motion.div 
          animate={isMaster ? { rotate: 360 } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className={`w-32 h-32 rounded-3xl flex items-center justify-center border-2 ${isMaster ? 'border-[#00E5FF] shadow-[0_0_40px_rgba(0,229,255,0.3)]' : 'border-white/10'} transition-all`}
        >
          {isMaster ? <Unlock className="w-16 h-16 text-[#00E5FF]" /> : <Lock className="w-16 h-16 text-white/20" />}
        </motion.div>

        <div className="space-y-4 relative z-10">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
            {isMaster ? 'OPERATOR: MIKE' : 'SECURITY PROTOCOL'}
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto font-mono uppercase tracking-widest">
            {isMaster 
              ? 'All encrypted assets are now accessible. Master override active.' 
              : 'Restricted access zone. Please provide biometric credentials to proceed.'}
          </p>
        </div>

        <button 
          onClick={isMaster ? () => onLogin(false) : handleLogin}
          className={`px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all ${
            isMaster 
            ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' 
            : 'bg-[#00E5FF] text-black shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-105'
          }`}
        >
          {isMaster ? 'Terminate Session' : 'Initiate Uplink'}
        </button>

        <div className="grid grid-cols-3 gap-8 w-full pt-12 border-t border-white/5">
           <div className="space-y-1">
              <span className="text-[9px] font-mono text-white/20 uppercase">Encrytion</span>
              <p className="text-xs font-bold text-white/60">AES-256-XTS</p>
           </div>
           <div className="space-y-1">
              <span className="text-[9px] font-mono text-white/20 uppercase">Firewall</span>
              <p className="text-xs font-bold text-[#00E5FF]">ACTIVE</p>
           </div>
           <div className="space-y-1">
              <span className="text-[9px] font-mono text-white/20 uppercase">Auth Level</span>
              <p className="text-xs font-bold text-white/60">{isMaster ? 'MASTER' : 'USER'}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityProtocol;