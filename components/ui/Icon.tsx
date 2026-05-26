import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

type Size = 16 | 18 | 20 | 24;

type Props = {
  name: IconName;
  size?: Size;
  className?: string;
  'aria-hidden'?: boolean;
};

/**
 * Wraps Lucide so we control defaults once: stroke 1.75, color inherited from
 * text-color context, size constrained to the allowed set.
 */
export default function Icon({
  name,
  size = 20,
  className = '',
  'aria-hidden': ariaHidden = true
}: Props) {
  const Component = LucideIcons[name] as LucideIcon | undefined;
  if (!Component) return null;
  return (
    <Component
      size={size}
      strokeWidth={1.75}
      className={cn('shrink-0', className)}
      aria-hidden={ariaHidden}
    />
  );
}
