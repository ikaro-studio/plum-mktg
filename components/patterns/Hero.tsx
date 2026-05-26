import NextLink from 'next/link';
import { ArrowDownRight } from 'lucide-react';
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
    <section className="relative overflow-hidden">
      {/* Peach veil — fades top of hero zone */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px] bg-gradient-peach-veil pointer-events-none"
      />

      <Container className="relative pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-24">
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
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink-1 hover:text-plum-900 transition-colors duration-200 ease-soft px-2 py-2 rounded-md focus-visible:outline-none focus-visible:shadow-focus"
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
