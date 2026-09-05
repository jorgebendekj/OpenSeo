/**
 * Helper to resolve the SaaS application URLs.
 * In local dev (localhost/127.0.0.1), redirects to http://localhost:3001.
 * In production, redirects to https://app.findable.io or VITE_APP_URL.
 */

function getAppBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host.startsWith('192.168.')) {
      return 'http://localhost:3001';
    }
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:3001';
  }
  return import.meta.env.VITE_APP_URL || 'https://app.findableweb.io';
}

export const APP_BASE_URL = getAppBaseUrl();
export const SIGNIN_URL = `${APP_BASE_URL}/sign-in`;
export const SIGNUP_URL = `${APP_BASE_URL}/sign-up`;

export function getAppUrl(path: string = ''): string {
  const base = getAppBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
