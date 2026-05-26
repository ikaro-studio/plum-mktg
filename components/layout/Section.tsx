import { cn } from '@/lib/cn';
import type { ElementType, HTMLAttributes } from 'react';

type SectionSize = 'sm' | 'md' | 'lg' | 'xl';

type Props = HTMLAttributes<HTMLElement> & {
  size?: SectionSize;
  as?: ElementType;
  divider?: boolean;
};

const sizes: Record<SectionSize, string> = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40'
};

export default function Section({
  size = 'md',
  as,
  divider,
  className,
  ...rest
}: Props) {
  const Comp = (as ?? 'section') as ElementType;
  return (
    <Comp
      className={cn(
        sizes[size],
        divider && 'border-t border-line-strong',
        className
      )}
      {...rest}
    />
  );
}
