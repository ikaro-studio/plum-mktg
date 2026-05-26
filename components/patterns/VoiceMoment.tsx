import Container from '@/components/layout/Container';
import Phrase from '@/components/ui/Phrase';
import { cn } from '@/lib/cn';

type Props = {
  words: readonly string[];
};

/**
 * The page's typographic signature. Five lowercase soft phrases on a single
 * horizontal line at desktop, wrapping gracefully on mobile. No decoration,
 * no border, no background — restraint is the point.
 */
export default function VoiceMoment({ words }: Props) {
  return (
    <Container>
      <ul
        className={cn(
          'flex flex-wrap items-baseline justify-between',
          'gap-y-6 gap-x-8 md:gap-x-12 lg:gap-x-16',
          'py-8 md:py-12'
        )}
      >
        {words.map((w, i) => (
          <li key={w} className="flex items-baseline">
            <Phrase className="text-[36px] md:text-[52px] lg:text-[64px]">
              {w}
            </Phrase>
            {i < words.length - 1 && (
              <span
                aria-hidden
                className="hidden md:inline-block ml-8 md:ml-12 lg:ml-16 h-1 w-1 rounded-full bg-rose-300"
              />
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}
