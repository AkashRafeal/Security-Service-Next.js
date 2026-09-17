import React from 'react';

export const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  trend,
  className = '',
}) => {
  return (
    <div className={`group rounded-2xl bg-navy-900 border border-slate-800 p-5 shadow-card card-hover-effect ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20 group-hover:bg-gold-500/20 group-hover:border-gold-500/50 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-gold-600 transition-colors">
          {value}
        </span>
        {badge && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition-transform duration-200 group-hover:scale-105 ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 leading-snug">{subtitle}</p>
      )}
    </div>
  );
};

export default DashboardCard;
