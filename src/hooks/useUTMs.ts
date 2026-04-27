import { useEffect } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
type UTMKey = typeof UTM_KEYS[number];

export function useUTMs() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some((k) => params.has(k));
    if (!hasUtm) return;
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) sessionStorage.setItem(k, v);
    });
  }, []);
}

export function getUTMs(): Record<UTMKey, string> {
  return {
    utm_source:   sessionStorage.getItem('utm_source')   ?? 'organic',
    utm_medium:   sessionStorage.getItem('utm_medium')   ?? 'direct',
    utm_campaign: sessionStorage.getItem('utm_campaign') ?? '',
    utm_content:  sessionStorage.getItem('utm_content')  ?? '',
    utm_term:     sessionStorage.getItem('utm_term')     ?? '',
  };
}
