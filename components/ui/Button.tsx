'use client';

import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  children?: ReactNode;
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-[14px] text-[14px] gap-2',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-14 px-7 text-[17px] gap-2.5'
};

const iconSize: Record<Size, number> = { sm: 16, md: 18, lg: 20 };

const variants: Record<Variant, string> = {
  primary: cn(
    'bg-plum-800 text-cream-100 shadow-xs',
    'hover:bg-plum-700 hover:shadow-sm',
    'active:bg-plum-900 active:scale-[0.98] active:shadow-none'
  ),
  secondary: cn(
    'bg-transparent text-plum-800 border border-line-strong shadow-none',
    'hover:bg-plum-800/5 hover:border-line-strong',
    'active:bg-plum-800/10 active:scale-[0.98]'
  ),
  ghost: cn(
    'bg-transparent text-ink-2 shadow-none',
    'hover:bg-plum-800/5 hover:text-ink-1',
    'active:bg-plum-800/10 active:scale-[0.98]'
  ),
  accent: cn(
    'bg-peach-400 text-plum-900 shadow-xs',
    'hover:bg-peach-400/90 hover:shadow-sm',
    'active:bg-peach-400/80 active:scale-[0.98] active:shadow-none'
  )
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    disabled,
    className,
    children,
    ...rest
  },
  ref
) {
  const Icon = iconSize[size];
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-all duration-200 ease-soft',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizes[size],
        variants[variant],
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2
          size={Icon}
          strokeWidth={1.75}
          className="animate-spin"
          aria-hidden
        />
      ) : (
        LeftIcon && <LeftIcon size={Icon} strokeWidth={1.75} aria-hidden />
      )}
      <span className={cn(loading && 'opacity-40')}>{children}</span>
      {RightIcon && !loading && (
        <RightIcon size={Icon} strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
});

export default Button;
