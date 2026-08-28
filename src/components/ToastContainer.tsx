// ============================================================
// ARRIS LIBRARY — Toast Notification Container
// ============================================================

import { useToast } from '../hooks/useToast';

const iconMap = {
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

const colorMap = {
  success: 'bg-emerald-900/90 border-emerald-600 text-emerald-100',
  error:   'bg-red-900/90 border-red-600 text-red-100',
  info:    'bg-obsidian-800/90 border-gold-500 text-gold-100',
  warning: 'bg-amber-900/90 border-amber-500 text-amber-100',
};

const iconColorMap = {
  success: 'text-emerald-400',
  error:   'text-red-400',
  info:    'text-gold-400',
  warning: 'text-amber-400',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl animate-fade-in-up pointer-events-auto ${colorMap[toast.type]}`}
        >
          <span className={`mt-0.5 flex-shrink-0 ${iconColorMap[toast.type]}`}>
            {iconMap[toast.type]}
          </span>
          <p className="flex-1 text-sm font-inter font-medium leading-relaxed">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity mt-0.5"
            aria-label="Dismiss notification"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
