import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/cn';

type PlumLogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  lightClassName?: string;
  darkClassName?: string;
  alt?: string;
};

export default function PlumLogo({
  alt = 'Plum',
  className,
  lightClassName,
  darkClassName,
  ...imageProps
}: PlumLogoProps) {
  return (
    <>
      <Image
        src={'/brand/logo-full-color.svg'}
        alt={alt}
        className={cn('block dark:hidden', className, lightClassName)}
        {...imageProps}
      />
      <Image
        src={'/brand/logo-white.svg'}
        alt={alt}
        className={cn('hidden dark:block', className, darkClassName)}
        {...imageProps}
      />
    </>
  );
}
