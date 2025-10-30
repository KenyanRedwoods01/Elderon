import * as React from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
}

const toastStyles: Record<ToastType, { bg: string; border: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: <CheckCircle className="h-5 w-5 text-green-600" />,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: <XCircle className="h-5 w-5 text-red-600" />,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <Info className="h-5 w-5 text-blue-600" />,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
  },
};

export const Toast: React.FC<ToastProps> = ({ type, message, duration = 5000, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const style = toastStyles[type];

  return (
    <div
      className={clsx(
        'fixed top-4 right-4 z-50 flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md animate-slide-in-right',
        style.bg,
        style.border
      )}
    >
      {style.icon}
      <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

Toast.displayName = 'Toast';
