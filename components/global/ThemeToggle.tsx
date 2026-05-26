'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
};

/**
 * Sun / moon toggle. Mounts a placeholder on the server (theme is undefined
 * during SSR) and resolves to the real toggle once hydrated, to avoid a
 * theme-flicker on first paint.
 */
export default function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={mounted ? `Switch to ${next} mode` : 'Toggle theme'}
      title={mounted ? `Switch to ${next} mode` : 'Toggle theme'}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-md',
        'text-fg-muted hover:text-fg-strong hover:bg-fg-strong/[0.05]',
        'transition-colors duration-200 ease-soft',
        'focus-visible:outline-none focus-visible:shadow-focus',
        className
      )}
    >
      {/* Render both icons stacked, cross-fade between them */}
      <Sun
        size={18}
        strokeWidth={1.75}
        className={cn(
          'absolute transition-all duration-300 ease-soft',
          mounted && !isDark
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-75'
        )}
        aria-hidden
      />
      <Moon
        size={18}
        strokeWidth={1.75}
        className={cn(
          'absolute transition-all duration-300 ease-soft',
          mounted && isDark
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-75'
        )}
        aria-hidden
      />
    </button>
  );
}
