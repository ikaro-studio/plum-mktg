import { cn } from '@/lib/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { invalid, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'block w-full h-11 px-[14px] rounded-md',
        'bg-surface-elevated border text-fg-strong placeholder:text-fg-subtle',
        'transition-all duration-200 ease-soft',
        'focus:outline-none focus:shadow-focus',
        invalid
          ? 'border-accent'
          : 'border-line-strong hover:border-rose-300 focus:border-accent',
        'disabled:bg-surface-sunken/50 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    />
  );
});

export default Input;
