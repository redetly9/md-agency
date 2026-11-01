import Link from 'next/link';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="MD — на главную">
      <span className="w-9 h-9 rounded-xl bg-brand text-white font-extrabold text-sm tracking-tight flex items-center justify-center shadow-sm">MD</span>
      <span className="hidden sm:flex flex-col leading-none">
        <span className="font-extrabold text-ink tracking-tight">md.kz</span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-ink-3">rent · live · own</span>
      </span>
    </Link>
  );
}
