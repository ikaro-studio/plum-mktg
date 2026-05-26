import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLSpanElement>;

export default function Caption({ className, ...rest }: Props) {
  return (
    <span
      className={cn('text-[12px] tracking-wide text-ink-3', className)}
      {...rest}
    />
  );
}
