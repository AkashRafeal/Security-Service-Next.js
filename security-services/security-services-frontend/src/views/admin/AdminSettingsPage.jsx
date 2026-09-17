'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Save, Building, Phone, Mail, MapPin, Globe, ShieldCheck } from 'lucide-react';

export const AdminSettingsPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'ABC SECURITY SERVICES CORP',
    tagline: 'Elite Protection, Surveillance & Tactical Risk Mitigation',
    emergencyPhone: '1-800-555-9111',
    officePhone: '+1 (800) 555-0199',
    contactEmail: 'operations@abc-security.com',
    supportEmail: 'dispatch@abc-security.com',
    hqAddress: '100 ABC Plaza, Suite 400, New York, NY 10001',
    licenseNumber: 'NY-PSC-LIC-99201948B',
    facebookUrl: 'https://facebook.com',
    twitterUrl: 'https://twitter.com',
    linkedinUrl: 'https://linkedin.com',
    maintenanceMode: 'false',
    bannerNotice: '24/7 Security Operations Center is fully staffed and active.'
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await adminService.getSettings();
      const data = res?.data?.data || res?.data || res;
      if (data && typeof data === 'object') {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      toast.info('Loaded active configuration profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(settings);
      toast.success('Corporate configuration saved successfully');
    } catch (err) {
      toast.error('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Corporate & Portal Configuration</h1>
        <p className="text-xs text-slate-400 mt-1">Configure company credentials, operational contact numbers, and emergency lines.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Profile */}
        <div className="bg-navy-900 rounded-2xl shadow-card border border-slate-800 p-6 space-y-5">
          <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-3.5">
            <Building className="w-5 h-5 text-gold-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Corporate Identity & Accreditation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                State Security License #
              </label>
              <input
                type="text"
                className="w-full bg-navy-950 text-gold-400 font-mono tracking-wider border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.licenseNumber}
                onChange={(e) => handleChange('licenseNumber', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Tagline / Mission Statement
            </label>
            <input
              type="text"
              className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
              value={settings.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
            />
          </div>
        </div>

        {/* Tactical & Operations Contact */}
        <div className="bg-navy-900 rounded-2xl shadow-card border border-slate-800 p-6 space-y-5">
          <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-3.5">
            <Phone className="w-5 h-5 text-gold-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Emergency & Operations Communications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1.5">
                24/7 Rapid Emergency Response Line *
              </label>
              <input
                type="text"
                className="w-full bg-navy-950 text-rose-400 font-bold border border-rose-500/50 hover:border-rose-400 focus:border-rose-400 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-rose-500/40 placeholder:text-slate-500"
                value={settings.emergencyPhone}
                onChange={(e) => handleChange('emergencyPhone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                HQ Central Switchboard
              </label>
              <input
                type="text"
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.officePhone}
                onChange={(e) => handleChange('officePhone', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Sales & RFQ Dispatch Email
              </label>
              <input
                type="email"
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                SOC Support Email
              </label>
              <input
                type="email"
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Command HQ Physical Address
            </label>
            <input
              type="text"
              className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
              value={settings.hqAddress}
              onChange={(e) => handleChange('hqAddress', e.target.value)}
            />
          </div>
        </div>

        {/* Global Broadcast Banner */}
        <div className="bg-navy-900 rounded-2xl shadow-card border border-slate-800 p-6 space-y-5">
          <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-3.5">
            <Globe className="w-5 h-5 text-gold-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Broadcast Notice & Social Channels</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Global Banner Notice
            </label>
            <input
              type="text"
              className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
              value={settings.bannerNotice}
              onChange={(e) => handleChange('bannerNotice', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                LinkedIn Profile
              </label>
              <input
                type="url"
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.linkedinUrl}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Twitter / X
              </label>
              <input
                type="url"
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.twitterUrl}
                onChange={(e) => handleChange('twitterUrl', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Facebook
              </label>
              <input
                type="url"
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                value={settings.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" type="submit" loading={saving} icon={Save} className="shadow-gold-glow">
            Save All Configurations
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
