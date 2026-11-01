import Link from 'next/link';
import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';
const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-[0_8px_24px_-8px_rgba(11,122,75,0.6)]',
  secondary: 'bg-brand-light text-brand hover:bg-[#d9eee2]',
  ghost: 'bg-transparent text-ink hover:bg-slate-100',
  dark: 'bg-ink text-white hover:bg-slate-800',
};
const sizes: Record<Size, string> = { sm: 'h-9 px-3.5 text-sm', md: 'h-11 px-5 text-[15px]', lg: 'h-14 px-7 text-base' };

type Props = {
  variant?: Variant; size?: Size; href?: string; className?: string; children: React.ReactNode;
  onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; full?: boolean;
};

export default function Button({ variant = 'primary', size = 'md', href, className = '', children, onClick, type = 'button', disabled, full }: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}
