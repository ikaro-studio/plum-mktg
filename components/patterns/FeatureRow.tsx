import { Check } from 'lucide-react';
import Container from '@/components/layout/Container';
import PlumAppMock from '@/components/patterns/PlumAppMock';
import Body from '@/components/ui/Body';
import Eyebrow from '@/components/ui/Eyebrow';
import Heading from '@/components/ui/Heading';
import { cn } from '@/lib/cn';

type MockVariant = 'library' | 'workspace' | 'collections';

type Props = {
  eyebrow: string;
  headline: string;
  body: string;
  points: readonly string[];
  mockVariant: MockVariant;
  index: number;
};

/**
 * Alternating L/R rows. Odd rows put visual on the right; even on the left.
 * On mobile the visual always lands below the copy.
 */
export default function FeatureRow({
  eyebrow,
  headline,
  body,
  points,
  mockVariant,
  index
}: Props) {
  const reverse = index % 2 === 1;
  return (
    <Container>
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center'
        )}
      >
        <div
          className={cn(
            'lg:col-span-5',
            reverse ? 'lg:order-2' : 'lg:order-1'
          )}
        >
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <Heading level={2} className="mb-6 text-[32px] md:text-[44px]">
            {headline}
          </Heading>
          <Body size="md" className="mb-8 max-w-[480px]">
            {body}
          </Body>
          <ul className="flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-ink-1">
                <Check
                  size={18}
                  strokeWidth={2}
                  className="text-rose-500 shrink-0 mt-0.5"
                  aria-hidden
                />
                <span className="leading-snug">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            'lg:col-span-7',
            reverse ? 'lg:order-1' : 'lg:order-2'
          )}
        >
          <PlumAppMock variant={mockVariant} />
        </div>
      </div>
    </Container>
  );
}
