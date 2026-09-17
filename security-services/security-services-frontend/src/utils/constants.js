export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Careers', path: '/careers' },
  { name: 'FAQ & Contact', path: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
  { name: 'Quotes', path: '/admin/quotes', icon: 'FileSpreadsheet' },
  { name: 'Enquiries', path: '/admin/enquiries', icon: 'Mail' },
  { name: 'Applications', path: '/admin/applications', icon: 'FileUser' },
  { name: 'Services', path: '/admin/services', icon: 'Shield' },
  { name: 'Categories', path: '/admin/service-categories', icon: 'Layers' },
  { name: 'Clients', path: '/admin/clients', icon: 'Handshake' },
  { name: 'Testimonials', path: '/admin/testimonials', icon: 'Star' },
  { name: 'FAQs', path: '/admin/faqs', icon: 'HelpCircle' },
  { name: 'Jobs', path: '/admin/jobs', icon: 'Briefcase' },
  { name: 'Users', path: '/admin/users', icon: 'UserCheck', adminOnly: true },
  { name: 'Notifications', path: '/admin/notifications', icon: 'Bell' },
  { name: 'Audit Logs', path: '/admin/audit-logs', icon: 'History', adminOnly: true },
  { name: 'Settings', path: '/admin/settings', icon: 'Settings', adminOnly: true },
];

export const COMPANY_INFO = {
  name: 'ABC Security Services Inc.',
  tagline: 'Professional Security Services You Can Trust',
  phonePrimary: '+1 (800) 826-4827',
  phoneEmergency: '+1 (800) 911-7328',
  email: 'dispatch@securityservices.com',
  address: '750 Sentinel Plaza, Defense Tower, Suite 1800, New York, NY 10005',
  hours: '24 Hours a Day / 7 Days a Week / 365 Days a Year',
  license: 'Licensed & Bonded Private Security Contractor #PSC-84920-A'
};

export const STATUS_COLORS = {
  NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CONTACTED: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  IN_PROGRESS: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  QUOTED: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  CONVERTED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  RESOLVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
  CLOSED: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  REVIEWING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  SHORTLISTED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  INTERVIEW: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  SELECTED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  PUBLISHED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  DRAFT: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};
