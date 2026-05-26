'use client';

import { ArrowRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import AccessRequestDialog from './AccessRequestDialog';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  variant?: Variant;
  size?: Size;
  withIcon?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Convenience trigger: Button + AccessRequestDialog with self-managed open state.
 * Drop one anywhere a Request access CTA is needed; no parent state plumbing.
 */
export default function RequestAccessButton({
  variant = 'primary',
  size = 'md',
  withIcon = false,
  className,
  children = 'Request access'
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        size={size}
        rightIcon={withIcon ? ArrowRight : undefined}
        onClick={() => setOpen(true)}
        className={cn(className)}
      >
        {children}
      </Button>
      <AccessRequestDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
