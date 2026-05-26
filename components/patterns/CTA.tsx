import Container from '@/components/layout/Container';
import EarlyAccessForm from '@/components/patterns/EarlyAccessForm';
import Body from '@/components/ui/Body';
import Eyebrow from '@/components/ui/Eyebrow';
import Heading from '@/components/ui/Heading';

type Props = {
  eyebrow: string;
  headline: string;
  body: string;
};

/**
 * Final-section moment. Full-bleed sage→peach gradient panel within the
 * container. During closed beta the form is inline (not a button-to-modal);
 * swap back to a `<Button>` when GA opens.
 */
export default function CTA({ eyebrow, headline, body }: Props) {
  return (
    <Container>
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-feng p-8 sm:p-12 md:p-16 lg:p-20">
        {/* Subtle cream wash behind the form column to seat it visually */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5 text-plum-900/80">{eyebrow}</Eyebrow>
            <Heading
              level={2}
              className="mb-5 text-plum-900 text-[40px] md:text-[64px]"
            >
              {headline}
            </Heading>
            <Body
              size="lg"
              className="text-plum-900/85 max-w-[480px]"
            >
              {body}
            </Body>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 md:p-7 shadow-md">
              <EarlyAccessForm tone="panel" source="home-cta" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
