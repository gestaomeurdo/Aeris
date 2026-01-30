"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TacticalButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  className?: string;
}

const TacticalButton = ({ icon: Icon, label, onClick, className }: TacticalButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 py-4 px-2",
        "bg-[#080808] border border-white/5 rounded-sm",
        "transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-[#0D0D0D]",
        "hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]",
        className
      )}
    >
      {/* Pulsing Amber Glow on Hover */}
      <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 transition-colors duration-500 rounded-sm" />
      
      <Icon className="w-5 h-5 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0)] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      
      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-[#D4AF37]/80 transition-colors duration-300">
        {label}
      </span>

      {/* Subtle Metallic Shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
    </motion.button>
  );
};

export default TacticalButton;