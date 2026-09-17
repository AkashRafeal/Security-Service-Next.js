import React from 'react';
import { Loader2, Shield } from 'lucide-react';

export const Loader = ({ fullScreen = false, message = 'Loading security data...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950/90 backdrop-blur-md">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-gold-500/20 border-t-gold-500 animate-spin" />
          <Shield className="w-7 h-7 text-gold-400 absolute" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-300 tracking-wide">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      <p className="text-xs font-medium text-slate-400">{message}</p>
    </div>
  );
};

export default Loader;
