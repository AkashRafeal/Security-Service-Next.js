'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UploadCloud, CheckCircle2, FileCheck, AlertCircle } from 'lucide-react';
import { publicService } from '../../services/publicService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';
import { CustomSelect } from '../common/CustomSelect';

const appSchema = z.object({
  applicantName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  location: z.string().min(2, 'Current location is required'),
  experienceYears: z.string().min(1, 'Please specify your experience'),
  message: z.string().optional(),
});

export const JobApplicationForm = ({ jobPostId, jobTitle = 'General Application' }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appSchema),
    defaultValues: {
      experienceYears: 'Entry Level (0-1 year)',
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) {
      setResumeFile(null);
      return;
    }

    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setFileError('Resume must be in PDF, DOC, or DOCX format');
      setResumeFile(null);
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError('File size must be under 15MB');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const onSubmit = async (data) => {
    if (!resumeFile) {
      setFileError('Please upload your resume file (PDF or DOC)');
      return;
    }

    const formData = new FormData();
    if (jobPostId) formData.append('jobPostId', jobPostId);
    formData.append('applicantName', data.applicantName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('location', data.location);
    formData.append('experienceYears', data.experienceYears);
    if (data.message) formData.append('message', data.message);
    formData.append('resume', resumeFile);

    try {
      await publicService.applyForJob(formData);
      setIsSuccess(true);
      toast.success('Your application has been submitted to Guard Recruitment!');
      reset();
      setResumeFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit application. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-navy-900 border border-gold-500/50 p-8 text-center shadow-elevated">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Application Received!</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
          Thank you for applying for <span className="text-gold-400 font-semibold">{jobTitle}</span>. Our recruitment board will review your credentials and contact you for tactical interview scheduling.
        </p>
        <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          {...register('applicantName')}
          placeholder="e.g. Marcus Vance"
          className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
        {errors.applicantName && <p className="text-xs text-rose-400 mt-1">{errors.applicantName.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="marcus@example.com"
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
          {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register('phone')}
            placeholder="+1 (555) 000-0000"
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
          {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Current City / Location *
          </label>
          <input
            type="text"
            {...register('location')}
            placeholder="Dallas, TX"
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
          {errors.location && <p className="text-xs text-rose-400 mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Total Security / Law Enforcement Experience *
          </label>
          <CustomSelect
            name="experienceYears"
            value={watch('experienceYears')}
            onChange={(e) => setValue('experienceYears', e.target.value, { shouldValidate: true })}
            error={!!errors.experienceYears}
          >
            <option value="Entry Level (0-1 year)">Entry Level (0-1 year)</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years (Special Forces / Veteran)">10+ years (Special Forces / Veteran)</option>
          </CustomSelect>
          {errors.experienceYears && <p className="text-xs text-rose-400 mt-1">{errors.experienceYears.message}</p>}
        </div>
      </div>

      {/* Resume File Upload */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Attach Resume (PDF, DOC, DOCX - Max 15MB) *
        </label>
        <div className="relative border-2 border-dashed border-slate-700 hover:border-gold-500/60 rounded-xl p-4 transition-all bg-navy-950 text-center flex flex-col items-center justify-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {resumeFile ? (
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <FileCheck className="w-5 h-5" />
              <span>{resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
          ) : (
            <div className="flex flex-col items-center py-1">
              <UploadCloud className="w-7 h-7 text-slate-400 mb-1" />
              <p className="text-xs font-medium text-slate-200">
                <span className="text-gold-400 underline">Upload Resume</span> (PDF, DOC, DOCX)
              </p>
            </div>
          )}
        </div>
        {fileError && (
          <div className="mt-1 flex items-center gap-1.5 text-xs text-rose-400">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{fileError}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Cover Note / Certifications (Guard Card, CCW, First Aid)
        </label>
        <textarea
          rows={3}
          {...register('message')}
          placeholder="Mention any state guard licensing card numbers, CPR certifications, or military MOS..."
          className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        className="w-full shadow-gold-glow mt-2"
      >
        Submit Application
      </Button>
    </form>
  );
};
