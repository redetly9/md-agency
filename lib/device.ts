import { cookies } from 'next/headers';

export const DEVICE_COOKIE = 'md_device';

/** Идентификатор устройства для привязки заявок и избранного до входа. */
export function getDeviceId(): string | null {
  try { return cookies().get(DEVICE_COOKIE)?.value ?? null; } catch { return null; }
}
