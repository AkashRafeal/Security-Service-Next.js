import React from 'react';
import { STATUS_COLORS } from '../../utils/constants';

export const StatusBadge = ({ status }) => {
  if (!status) return null;
  const normalized = status.toUpperCase();
  const colorClass = STATUS_COLORS[normalized] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';

  const formatText = (str) => {
    return str.replace(/_/g, ' ');
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${colorClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {formatText(normalized)}
    </span>
  );
};

export default StatusBadge;
