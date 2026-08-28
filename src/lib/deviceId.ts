// ============================================================
// ARRIS LIBRARY — Device Identity System
// Every device gets a permanent unique ID without login
// Admin ID: 202608
// ============================================================

import type { DeviceSession } from '../types';

const DEVICE_ID_KEY = 'arris_library_device_id';
const ADMIN_SESSION_KEY = 'arris_library_admin_session';
const ADMIN_CODE = '202608';

/** Generate a numeric device ID (10 digits) */
const generateDeviceId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 9000 + 1000).toString();
  return timestamp + random;
};

/** Detect device type from user agent */
const detectDeviceType = (): DeviceSession['device_type'] => {
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))/.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(ua)) return 'mobile';
  if (/macintosh|windows|linux/.test(ua)) {
    // Distinguish laptop from desktop via touch support as a heuristic
    if (navigator.maxTouchPoints > 0) return 'laptop';
    return 'desktop';
  }
  return 'unknown';
};

/** Detect OS from user agent */
const detectOS = (): string => {
  const ua = navigator.userAgent;
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows NT/.test(ua)) return 'Windows';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/iPhone OS/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown OS';
};

/** Detect browser */
const detectBrowser = (): string => {
  const ua = navigator.userAgent;
  if (/Edg/.test(ua)) return 'Microsoft Edge';
  if (/OPR|Opera/.test(ua)) return 'Opera';
  if (/Firefox/.test(ua)) return 'Firefox';
  if (/Chrome/.test(ua)) return 'Chrome';
  if (/Safari/.test(ua)) return 'Safari';
  return 'Unknown Browser';
};

/** Get or create device ID */
export const getDeviceId = (): string => {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = generateDeviceId();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
};

/** Build full device session info */
export const getDeviceSession = (): Omit<DeviceSession, 'first_visit' | 'last_visit' | 'visit_count'> => {
  const isAdmin = checkAdminSession();
  return {
    device_id: getDeviceId(),
    device_type: detectDeviceType(),
    browser: detectBrowser(),
    os: detectOS(),
    is_admin: isAdmin,
  };
};

/** Get device type label */
export const getDeviceTypeLabel = (): string => {
  const type = detectDeviceType();
  const labels: Record<DeviceSession['device_type'], string> = {
    desktop: 'Desktop PC',
    laptop: 'Laptop',
    tablet: 'Tablet',
    mobile: 'Mobile Phone',
    unknown: 'Device',
  };
  return labels[type];
};

// ─────────────────── Admin Auth ───────────────────

/** Authenticate as admin using the admin code */
export const authenticateAdmin = (code: string): boolean => {
  if (code === ADMIN_CODE) {
    const session = {
      is_admin: true,
      admin_id: ADMIN_CODE,
      authenticated_at: new Date().toISOString(),
    };
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
};

/** Check if current session is admin */
export const checkAdminSession = (): boolean => {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session?.is_admin === true && session?.admin_id === ADMIN_CODE;
  } catch {
    return false;
  }
};

/** Clear admin session (logout) */
export const logoutAdmin = (): void => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
};

/** Get admin ID */
export const getAdminId = (): string => ADMIN_CODE;
