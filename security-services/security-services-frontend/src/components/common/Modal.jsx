'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/85 backdrop-blur-md transition-opacity z-10"
          />

          {/* Modal Dialog Container */}
          <div className="relative z-20 flex min-h-full items-center justify-center p-3 sm:p-5 text-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`pointer-events-auto w-full ${maxWidth} transform rounded-2xl bg-navy-900 border border-slate-700/90 p-5 sm:p-6 text-left align-middle shadow-2xl transition-all my-auto max-h-[calc(100vh-2.5rem)] flex flex-col relative`}
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 shrink-0">
                <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 overflow-y-auto flex-1 pr-1.5 -mr-1.5 custom-scrollbar">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

