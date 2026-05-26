import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLSpanElement>;

/**
 * The "soft phrase" — Isidora Light substituted with Quicksand Light.
 * Lowercased via CSS so source copy stays naturally written.
 * Reserve for single-word warm accents: `helpful`, `balance`, `intact`.
 */
export default function Phrase({ className, ...rest }: Props) {
  return (
    <span
      className={cn(
        'font-soft font-light lowercase text-plum-800',
        'text-[28px] md:text-[36px] leading-snug tracking-normal',
        className
      )}
      {...rest}
    />
  );
}
