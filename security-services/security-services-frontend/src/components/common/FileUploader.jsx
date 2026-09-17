'use client';

import React, { useState } from 'react';
import { UploadCloud, FileCheck, AlertCircle, Loader2 } from 'lucide-react';
import { adminService } from '../../services/adminService';

export const FileUploader = ({
  onUploadSuccess,
  onChange,
  accept = 'image/*',
  label = 'Upload Image',
  hint = 'PNG, JPG, WEBP up to 10MB',
  isImage = true,
  currentUrl = '',
  value = '',
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value || currentUrl);

  const handleUploadSuccess = (val) => {
    if (onUploadSuccess) onUploadSuccess(val);
    if (onChange) onChange(val);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setLoading(true);

    try {
      if (isImage) {
        const url = await adminService.uploadImage(file);
        setPreview(url);
        handleUploadSuccess(url);
      } else {
        // Resume / document upload callback with file object
        handleUploadSuccess(file);
        setPreview(file.name);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'File upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative border-2 border-dashed border-slate-700 hover:border-gold-500/60 rounded-xl p-4 transition-all bg-navy-950/40 text-center flex flex-col items-center justify-center gap-2">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={loading}
        />

        {loading ? (
          <div className="flex flex-col items-center py-4">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
            <p className="mt-2 text-xs text-slate-400">Uploading file...</p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-2 py-1">
            {isImage ? (
              <img
                src={preview}
                alt="Preview"
                className="h-28 w-auto object-contain rounded-lg border border-slate-700"
              />
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                <FileCheck className="w-5 h-5" />
                <span>{preview}</span>
              </div>
            )}
            <p className="text-xs text-gold-400 font-medium">Click or drag to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2">
            <UploadCloud className="w-8 h-8 text-slate-400 mb-1" />
            <p className="text-sm font-medium text-slate-200">
              <span className="text-gold-400 underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">{hint}</p>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
