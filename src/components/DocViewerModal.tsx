"use client";

import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DocViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const DocViewerModal = ({ isOpen, onClose, url, title }: DocViewerModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full h-full max-w-6xl bg-[#0A192F] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-widest font-black">DOCUMENT VIEWER</span>
                <h3 className="text-xl font-bold text-white uppercase">{title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-white/60" />
                </a>
                <button 
                  onClick={onClose}
                  className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white/[0.02]">
              <iframe 
                src={url} 
                className="w-full h-full border-none"
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DocViewerModal;