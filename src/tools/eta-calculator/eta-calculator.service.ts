import { formatDuration } from 'date-fns';
import type { Locale } from 'date-fns';

export function formatMsDuration(duration: number, options?: { locale?: Locale; msLabel?: string }) {
  const ms = Math.floor(duration % 1000);
  const secs = Math.floor(((duration - ms) / 1000) % 60);
  const mins = Math.floor((((duration - ms) / 1000 - secs) / 60) % 60);
  const hrs = Math.floor((((duration - ms) / 1000 - secs) / 60 - mins) / 60);

  const formatted = formatDuration(
    {
      hours: hrs,
      minutes: mins,
      seconds: secs,
    },
    { locale: options?.locale },
  );

  return formatted + (ms > 0 ? ` ${ms} ${options?.msLabel ?? 'ms'}` : '');
}
