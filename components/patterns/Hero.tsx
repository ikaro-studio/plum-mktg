import NextLink from 'next/link';
import { ArrowDownRight } from 'lucide-react';
import AsciiHeroBackground from '@/components/global/AsciiHeroBackground';
import Container from '@/components/layout/Container';
import PlumAppMock from '@/components/patterns/PlumAppMock';
import RequestAccessButton from '@/components/patterns/RequestAccessButton';
import Body from '@/components/ui/Body';
import Eyebrow from '@/components/ui/Eyebrow';
import Heading from '@/components/ui/Heading';

type Props = {
  eyebrow: string;
  headline: string;
  body: string;
  secondaryCta: string;
  secondaryCtaHref: string;
};

export default function Hero({
  eyebrow,
  headline,
  body,
  secondaryCta,
  secondaryCtaHref
}: Props) {
  return (
    <section className="relative overflow-hidden -mt-16 lg:-mt-[72px]">
      <AsciiHeroBackground />

      {/* Peach veil — fades top of hero zone, softly blurs the ASCII underneath */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[560px] pointer-events-none bg-gradient-peach-veil backdrop-blur-[3px] [mask-image:linear-gradient(180deg,#000_0%,#000_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(180deg,#000_0%,#000_70%,transparent_100%)]"
      />

      <Container className="relative pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24">
        <div className="max-w-[920px]">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <Heading level={1} className="mb-8 md:mb-10">
            {headline}
          </Heading>
          <Body
            size="lg"
            className="max-w-[640px] mb-10 md:mb-12 text-ink-1"
          >
            {body}
          </Body>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <RequestAccessButton size="lg" withIcon />
            <NextLink
              href={secondaryCtaHref}
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-fg-strong hover:text-accent transition-colors duration-200 ease-soft px-2 py-2 rounded-md focus-visible:outline-none focus-visible:shadow-focus"
            >
              {secondaryCta}
              <ArrowDownRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-200 ease-soft group-hover:translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </NextLink>
          </div>
        </div>

        <div className="mt-16 md:mt-20 lg:mt-24">
          <PlumAppMock variant="library" labelled />
        </div>
      </Container>
    </section>
  );
}
