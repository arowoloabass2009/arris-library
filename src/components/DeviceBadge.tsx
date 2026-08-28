// ============================================================
// ARRIS LIBRARY — Device ID Badge
// ============================================================

import { useState } from 'react';
import { getDeviceId, getDeviceTypeLabel } from '../lib/deviceId';

export default function DeviceBadge() {
  const [copied, setCopied] = useState(false);
  const deviceId = getDeviceId();
  const deviceLabel = getDeviceTypeLabel();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deviceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={`Your ${deviceLabel} ID — Click to copy`}
      className="group flex items-center gap-2 bg-obsidian-800/80 border border-gold-500/30 hover:border-gold-400/60 rounded-lg px-3 py-1.5 transition-all duration-200 cursor-pointer"
    >
      {/* Device icon */}
      <span className="text-gold-400 text-xs">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </span>
      <div className="flex flex-col items-start">
        <span className="text-obsidian-300 font-inter text-[9px] uppercase tracking-widest leading-none">
          {deviceLabel} ID
        </span>
        <span className="text-gold-300 font-inter font-semibold text-xs tracking-wider leading-tight mt-0.5">
          {copied ? 'Copied!' : `#${deviceId}`}
        </span>
      </div>
    </button>
  );
}
