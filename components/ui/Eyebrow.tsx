import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLParagraphElement>;

/**
 * Uppercase, wide-tracked label that sits above section headings.
 * Per brand brief: 13px, 0.12em tracking, weight 600, plum-warm gray.
 * CSS uppercases the content so source copy can stay readable.
 */
export default function Eyebrow({ className, ...rest }: Props) {
  return (
    <p
      className={cn(
        'text-[13px] font-semibold uppercase tracking-eyebrow text-ink-2',
        className
      )}
      {...rest}
    />
  );
}
