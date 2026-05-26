import BetaContextStrip from '@/components/patterns/BetaContextStrip';
import CTA from '@/components/patterns/CTA';
import FeatureRow from '@/components/patterns/FeatureRow';
import Hero from '@/components/patterns/Hero';
import VoiceMoment from '@/components/patterns/VoiceMoment';
import Section from '@/components/layout/Section';
import { home } from '@/content/home';

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={home.hero.eyebrow}
        headline={home.hero.headline}
        body={home.hero.body}
        secondaryCta={home.hero.secondaryCta}
        secondaryCtaHref={home.hero.secondaryCtaHref}
      />

      <BetaContextStrip
        eyebrow={home.betaStrip.eyebrow}
        sentence={home.betaStrip.sentence}
      />

      <Section size="lg" id="features" className="flex flex-col gap-24 md:gap-32">
        {home.features.map((feature, i) => (
          <FeatureRow
            key={feature.headline}
            eyebrow={feature.eyebrow}
            headline={feature.headline}
            body={feature.body}
            points={feature.points}
            mockVariant={feature.mockVariant}
            index={i}
          />
        ))}
      </Section>

      <Section size="md">
        <VoiceMoment words={home.voiceWords} />
      </Section>

      <Section size="lg">
        <CTA
          eyebrow={home.cta.eyebrow}
          headline={home.cta.headline}
          body={home.cta.body}
        />
      </Section>
    </>
  );
}
