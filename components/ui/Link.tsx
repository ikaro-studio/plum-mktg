import NextLink from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Tone = 'inline' | 'quiet';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  tone?: Tone;
  children?: ReactNode;
};

/**
 * Inline link treatment: accent color with a hairline underline that wipes in
 * from the left on hover. No always-on underline — the line lives only when
 * you're touching it.
 *
 * Quiet variant: color shift only, used in nav/footer/dense lists.
 */
export default function Link({
  href,
  tone = 'inline',
  className,
  children,
  ...rest
}: Props) {
  const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');

  const toneStyles =
    tone === 'inline'
      ? cn(
          'relative inline-flex items-baseline gap-0.5',
          'text-accent transition-colors duration-200 ease-soft',
          'hover:text-accent-hover',
          // Wipe-in underline via pseudo-element. Sits 2px below baseline.
          "after:content-[''] after:absolute after:left-0 after:bottom-[-2px]",
          'after:h-[1px] after:w-0 after:bg-current',
          'after:transition-[width] after:duration-300 after:ease-soft',
          'hover:after:w-full focus-visible:after:w-full'
        )
      : cn(
          'inline-flex items-baseline gap-0.5',
          'text-fg-muted no-underline transition-colors duration-200 ease-soft',
          'hover:text-fg-strong'
        );

  const inner = (
    <>
      {children}
      {isExternal && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="ml-0.5 inline-block translate-y-[1px]"
          aria-hidden
        />
      )}
    </>
  );

  const cls = cn(
    toneStyles,
    'focus-visible:outline-none focus-visible:shadow-focus rounded-sm',
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <NextLink href={href} className={cls} {...rest}>
      {inner}
    </NextLink>
  );
}
