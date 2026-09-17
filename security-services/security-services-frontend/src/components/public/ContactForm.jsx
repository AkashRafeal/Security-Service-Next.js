'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';
import { publicService } from '../../services/publicService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await publicService.submitContact(data);
      setSubmitted(true);
      toast.success('Your enquiry has been received. Our team will contact you shortly.');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-navy-900 border border-gold-500/40 p-8 text-center shadow-elevated">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Dispatched!</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
          Thank you for reaching out to ABC Security. A security operations commander will review your details and respond within 2 hours.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Send Another Message
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
          {...register('name')}
          placeholder="e.g. Robert Vance"
          className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
        {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="robert@company.com"
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
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
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
          {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Subject
        </label>
        <input
          type="text"
          {...register('subject')}
          placeholder="e.g. Facility Security Audit or Guard Deployment"
          className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Security Requirements / Message *
        </label>
        <textarea
          rows={4}
          {...register('message')}
          placeholder="Please describe your facility location, threat considerations, or guarding schedule..."
          className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
        {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        icon={Send}
        className="w-full mt-2"
      >
        Submit Enquiry
      </Button>
    </form>
  );
};
