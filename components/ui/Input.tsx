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
        'bg-white border text-plum-900 placeholder:text-ink-3',
        'transition-all duration-200 ease-soft',
        'focus:outline-none focus:shadow-focus',
        invalid
          ? 'border-rose-500'
          : 'border-line-strong hover:border-rose-300 focus:border-rose-500',
        'disabled:bg-cream-200/50 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    />
  );
});

export default Input;
