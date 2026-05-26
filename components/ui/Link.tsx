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
 * Inline link: text in accent, no underline. On hover, a soft accent-colored
 * gradient + blur blooms behind the text. The gradient direction inverts
 * between modes — rising from below in light, descending from above in dark
 * — so the moment reads as "warmth from the page" or "warmth from the sky"
 * depending on theme.
 *
 * Quiet variant: nav/footer-style, color shift only.
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
          // Layout — isolate creates a stacking context so -z-10 stays local
          'relative isolate inline-flex items-baseline gap-0.5',
          // Resting state
          'text-accent transition-colors duration-200 ease-soft',
          'hover:text-accent-hover',
          // Hover glow — pseudo-element with blurred accent gradient.
          // Light: gradient rises from below the text. Dark: descends from above.
          "after:content-[''] after:absolute after:-inset-x-2 after:-inset-y-1.5 after:-z-10",
          'after:rounded-md after:blur-[6px]',
          'after:bg-[linear-gradient(0deg,var(--accent)_0%,transparent_75%)]',
          'dark:after:bg-[linear-gradient(180deg,var(--accent)_0%,transparent_75%)]',
          'after:opacity-0 after:pointer-events-none',
          'after:transition-opacity after:duration-300 after:ease-soft',
          'hover:after:opacity-40 focus-visible:after:opacity-40'
        )
      : cn(
          'inline-flex items-baseline gap-0.5',
          'text-fg-muted transition-colors duration-200 ease-soft',
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
