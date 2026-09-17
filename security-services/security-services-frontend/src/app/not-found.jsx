import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-navy-950 text-slate-900">
      <div className="w-20 h-20 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 font-extrabold text-3xl mb-6 shadow-gold-glow">
        404
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30 uppercase tracking-widest inline-block mb-3">
        Zone Restricted
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">Page Not Found</h1>
      <p className="text-slate-600 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        The requested tactical resource does not exist or has been relocated to another sector.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-bold text-sm shadow-gold-glow transition-all"
      >
        Return to Main Command Center
      </Link>
    </div>
  );
}
