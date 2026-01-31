"use client";

import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl aspect-video bg-zinc-900 rounded-xl shadow-2xl border border-cyan-500/30">
        
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 z-10 p-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors shadow-lg"
          aria-label="Close video player"
        >
          <X size={24} />
        </button>

        <iframe
          className="w-full h-full rounded-xl"
          src={videoUrl}
          title="Tactical Overview Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;