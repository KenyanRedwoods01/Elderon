import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const spinnerVariants = cva('animate-spin text-blue-600', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export const Spinner: React.FC<SpinnerProps> = ({ className, size, ...props }) => {
  return (
    <div className={clsx('inline-flex items-center justify-center', className)} {...props}>
      <Loader2 className={spinnerVariants({ size })} />
    </div>
  );
};

Spinner.displayName = 'Spinner';
