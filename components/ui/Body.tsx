import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Size = 'sm' | 'md' | 'lg';

type Props = HTMLAttributes<HTMLParagraphElement> & {
  size?: Size;
};

const sizes: Record<Size, string> = {
  sm: 'text-[14px] leading-[1.55] text-ink-2',
  md: 'text-[16px] leading-[1.6] text-ink-1',
  lg: 'text-[18px] md:text-[20px] leading-[1.5] text-ink-1'
};

export default function Body({ size = 'md', className, ...rest }: Props) {
  return (
    <p className={cn(sizes[size], 'text-pretty', className)} {...rest} />
  );
}
