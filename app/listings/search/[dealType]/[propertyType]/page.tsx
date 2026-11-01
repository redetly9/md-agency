import { redirect } from 'next/navigation';

export default function LegacySearch({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const n = new URLSearchParams();
  Object.entries(searchParams).forEach(([k, v]) => v && n.set(k, v));
  redirect(`/catalog${n.toString() ? `?${n}` : ''}`);
}
