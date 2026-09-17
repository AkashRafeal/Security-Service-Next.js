import React from 'react';
import { Award, Mail, Linkedin } from 'lucide-react';
import { handleImageError } from '../../utils/imageHelper';

export const TeamCard = ({ member }) => {
  return (
    <div className="group rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-card hover:shadow-elevated">
      <div className="relative h-64 w-full overflow-hidden bg-navy-950">
        <img
          src={member.profileImageUrl || '/images/hero_executive_protection.jpg'}
          alt={member.name}
          onError={(e) => handleImageError(e, '/images/hero_executive_protection.jpg')}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-navy-950/80 backdrop-blur-md text-gold-400 border border-gold-500/30 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          <span>{member.experienceYears}+ Years Experience</span>
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider mt-0.5 mb-3">
          {member.designation}
        </p>

        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4 flex-grow">
          {member.bio}
        </p>

        {member.specializations && (
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Focus: </span>
            {member.specializations}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          {member.email && (
            <a href={`mailto:${member.email}`} className="hover:text-gold-400 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          )}
          {member.linkedinUrl && (
            <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-gold-400 flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
