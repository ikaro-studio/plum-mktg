import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Cols = 1 | 2 | 3 | 4;
type Gap = 'sm' | 'md' | 'lg';

type Props = HTMLAttributes<HTMLDivElement> & {
  cols?: Cols;
  gap?: Gap;
};

const colMap: Record<Cols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4'
};

const gapMap: Record<Gap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8'
};

export default function Grid({
  cols = 3,
  gap = 'md',
  className,
  ...rest
}: Props) {
  return (
    <div
      className={cn('grid', colMap[cols], gapMap[gap], className)}
      {...rest}
    />
  );
}
