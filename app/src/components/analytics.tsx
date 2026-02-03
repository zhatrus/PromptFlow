'use client';

import { useEffect } from 'react';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_ANALYTICS_WEBHOOK_URL;
const VISITOR_COOKIE_NAME = 'visitor_id';
const COOKIE_EXPIRY_DAYS = 365;

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function collectAnalyticsData(visitorId: string) {
  return {
    visitor_id: visitorId,
    user_agent: navigator.userAgent,
    screen: {
      width: screen.width,
      height: screen.height,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    referrer: document.referrer || 'direct',
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    first_visit: true,
  };
}

async function sendAnalytics(data: ReturnType<typeof collectAnalyticsData>): Promise<void> {
  if (!WEBHOOK_URL) {
    console.warn('[Analytics] Webhook URL not configured');
    return;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('[Analytics] Failed to send data:', error);
  }
}

export function Analytics() {
  useEffect(() => {
    // Перевіряємо наявність visitor_id в cookie
    let visitorId = getCookie(VISITOR_COOKIE_NAME);

    if (!visitorId) {
      // Перший візит — генеруємо ID, відправляємо дані, встановлюємо cookie
      visitorId = generateUUID();
      setCookie(VISITOR_COOKIE_NAME, visitorId, COOKIE_EXPIRY_DAYS);

      const analyticsData = collectAnalyticsData(visitorId);
      sendAnalytics(analyticsData);
    }
    // Якщо visitor_id вже є — нічого не робимо (дедуплікація)
  }, []);

  return null; // Компонент не рендерить нічого
}
