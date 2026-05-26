import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function Container({ className, ...rest }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1240px] px-6 md:px-8 lg:px-12',
        className
      )}
      {...rest}
    />
  );
}
