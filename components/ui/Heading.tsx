import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Level = 1 | 2 | 3 | 4;

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level: Level;
};

/**
 * Level 1 is the display headline — `clamp()`-scaled, used once per page.
 * Levels 2–4 step down per the brief's anchored scale (56 / 32 / 24).
 */
export default function Heading({
  level,
  className,
  children,
  ...rest
}: Props) {
  const base = 'text-plum-900 text-balance';
  switch (level) {
    case 1:
      return (
        <h1
          {...rest}
          className={cn(
            base,
            'font-extrabold leading-[0.95] tracking-display',
            'text-[clamp(56px,9vw,128px)]',
            className
          )}
        >
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          {...rest}
          className={cn(
            base,
            'text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-display',
            className
          )}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          {...rest}
          className={cn(
            base,
            'text-[28px] md:text-[32px] font-bold leading-tight tracking-tight',
            className
          )}
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          {...rest}
          className={cn(
            base,
            'text-[20px] md:text-[24px] font-semibold leading-snug',
            className
          )}
        >
          {children}
        </h4>
      );
  }
}
