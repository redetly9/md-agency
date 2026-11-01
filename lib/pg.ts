import { Pool } from 'pg';

// Прямое подключение к Postgres (Supabase pooler). Используется только на сервере.
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const pool = globalForPg.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : undefined,
});
if (process.env.NODE_ENV !== 'production') globalForPg.pgPool = pool;

export async function q<T = any>(text: string, params: any[] = []): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}
