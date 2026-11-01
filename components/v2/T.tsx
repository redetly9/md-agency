'use client';
import { useT } from './i18n';
/** Переводимая строка для серверных страниц. */
export default function T({ k }: { k: string }) { const { t } = useT(); return <>{t(k)}</>; }
