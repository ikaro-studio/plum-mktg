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
 * Auto-routes between next/link (internal) and an external anchor.
 * External links get a small ArrowUpRight glyph and the right rel/target.
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
          'text-rose-500 underline underline-offset-4 decoration-rose-500/30',
          'transition-colors duration-200 ease-soft',
          'hover:decoration-rose-500'
        )
      : cn(
          'text-ink-2 no-underline transition-colors duration-200 ease-soft',
          'hover:text-plum-900'
        );

  const inner = (
    <>
      {children}
      {isExternal && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="ml-0.5 inline-block align-[-0.125em]"
          aria-hidden
        />
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(toneStyles, className)}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <NextLink href={href} className={cn(toneStyles, className)} {...rest}>
      {inner}
    </NextLink>
  );
}
