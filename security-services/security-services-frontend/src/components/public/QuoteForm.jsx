'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShieldCheck, CheckCircle2, Calculator } from 'lucide-react';
import { publicService } from '../../services/publicService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';
import { CustomSelect } from '../common/CustomSelect';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  serviceRequired: z.string().min(1, 'Please select a security service'),
  location: z.string().min(3, 'Location / Facility address is required'),
  numberOfGuardsRequired: z.coerce.number().min(1, 'At least 1 guard required'),
  startDate: z.string().optional(),
  duration: z.string().optional(),
  securityRequirements: z.string().optional(),
  message: z.string().optional(),
});

export const QuoteForm = ({ preselectedService = '' }) => {
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      serviceRequired: preselectedService || 'Security Guard Services',
      numberOfGuardsRequired: 2,
      duration: 'Annual Contract',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await publicService.submitQuote(data);
      setSubmittedQuote(res.data);
      toast.success('Quote request submitted successfully!');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit quote. Please try again.');
    }
  };

  if (submittedQuote) {
    return (
      <div className="rounded-2xl bg-navy-900 border border-gold-500/50 p-8 text-center shadow-elevated">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-1">
          Reference Number: {submittedQuote.quoteNumber}
        </span>
        <h3 className="text-2xl font-bold text-white mb-3">Quote Request Initiated!</h3>
        <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <span className="text-white font-semibold">{submittedQuote.name}</span>. Our corporate risk assessment division is reviewing your requirement for{' '}
          <span className="text-gold-400 font-medium">{submittedQuote.serviceRequired}</span>. A senior coordinator will contact you at {submittedQuote.email} within 2 business hours.
        </p>
        <Button variant="primary" size="md" onClick={() => setSubmittedQuote(null)}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder="John Doe"
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
          {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Company / Organization
          </label>
          <input
            type="text"
            {...register('company')}
            placeholder="Aegis Global Enterprises"
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="john@example.com"
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
            Service Required *
          </label>
          <CustomSelect
            name="serviceRequired"
            value={watch('serviceRequired')}
            onChange={(e) => setValue('serviceRequired', e.target.value, { shouldValidate: true })}
            error={!!errors.serviceRequired}
          >
            <option value="Security Guard Services">Security Guard Services</option>
            <option value="Corporate Security">Corporate Security</option>
            <option value="Residential Security">Residential Security</option>
            <option value="Event Security">Event Security</option>
            <option value="Industrial & Factory Security">Industrial & Factory Security</option>
            <option value="Bank & Financial Security">Bank & Financial Security</option>
            <option value="Hospital & Healthcare Security">Hospital & Healthcare Security</option>
            <option value="School & Campus Security">School & Campus Security</option>
            <option value="Retail & Mall Security">Retail & Mall Security</option>
            <option value="Warehouse & Logistics Security">Warehouse & Logistics Security</option>
            <option value="VIP & Close Protection">VIP & Close Protection</option>
            <option value="CCTV & Central Monitoring">CCTV & Central Monitoring</option>
            <option value="Security Consultancy & Audits">Security Consultancy & Audits</option>
          </CustomSelect>
          {errors.serviceRequired && <p className="text-xs text-rose-400 mt-1">{errors.serviceRequired.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Facility Location / City *
          </label>
          <input
            type="text"
            {...register('location')}
            placeholder="e.g. Dallas, TX or 742 Financial Ave"
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
          {errors.location && <p className="text-xs text-rose-400 mt-1">{errors.location.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Number of Guards
          </label>
          <input
            type="number"
            min={1}
            {...register('numberOfGuardsRequired')}
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
          {errors.numberOfGuardsRequired && <p className="text-xs text-rose-400 mt-1">{errors.numberOfGuardsRequired.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Estimated Start Date
          </label>
          <input
            type="date"
            {...register('startDate')}
            className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Contract Duration
          </label>
          <CustomSelect
            name="duration"
            value={watch('duration')}
            onChange={(e) => setValue('duration', e.target.value, { shouldValidate: true })}
          >
            <option value="Annual Contract">Annual Contract</option>
            <option value="6 Months">6 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="1 Month">1 Month</option>
            <option value="Temporary / Event (Days)">Temporary / Event (Days)</option>
          </CustomSelect>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Detailed Security Specifications & Post Orders
        </label>
        <textarea
          rows={3}
          {...register('securityRequirements')}
          placeholder="Specify shifts (e.g. 24/7 or night-only), armed vs unarmed requirements, access barrier equipment needed..."
          className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        icon={Calculator}
        className="w-full shadow-gold-glow mt-3"
      >
        Request Formal Quotation & SLA Review
      </Button>
    </form>
  );
};
