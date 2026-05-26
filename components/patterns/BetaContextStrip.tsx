import Container from '@/components/layout/Container';
import Eyebrow from '@/components/ui/Eyebrow';

type Props = {
  eyebrow: string;
  sentence: string;
};

/**
 * The Plum-flavored answer to "🔥 Limited time!" — one calm sentence,
 * hairline-bordered top and bottom. Scarcity without panic.
 */
export default function BetaContextStrip({ eyebrow, sentence }: Props) {
  return (
    <div className="border-y border-line-strong/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 py-6 md:py-7">
          <Eyebrow className="text-plum-900 shrink-0 whitespace-nowrap">
            {eyebrow}
          </Eyebrow>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-ink-1 text-balance">
            {sentence}
          </p>
        </div>
      </Container>
    </div>
  );
}
