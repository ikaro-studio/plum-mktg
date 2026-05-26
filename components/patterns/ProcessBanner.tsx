import Container from '@/components/layout/Container';
import Body from '@/components/ui/Body';
import Eyebrow from '@/components/ui/Eyebrow';
import Heading from '@/components/ui/Heading';
import { cn } from '@/lib/cn';

type Step = {
  number: string;
  title: string;
  body: string;
};

type Props = {
  eyebrow: string;
  headline: string;
  body: string;
  steps: readonly Step[];
};

/**
 * Center-focused banner: a hero-bridge between feature rows and the final
 * CTA. Eyebrow + H3 + body sit centered, narrow. Below, a wide card lays
 * out the three-step closed-beta flow with hairline dividers between steps.
 */
export default function ProcessBanner({
  eyebrow,
  headline,
  body,
  steps
}: Props) {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <Heading level={3} className="mb-5 max-w-[640px]">
          {headline}
        </Heading>
        <Body size="md" className="max-w-[560px] text-fg-muted">
          {body}
        </Body>
      </div>

      <div
        className={cn(
          'relative rounded-[28px] border border-line bg-surface-elevated shadow-sm',
          'px-8 md:px-12 py-12 md:py-16'
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-line">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={cn(
                'flex flex-col gap-3 md:px-8',
                i === 0 && 'md:pl-0',
                i === steps.length - 1 && 'md:pr-0',
                i > 0 && 'pt-10 md:pt-0 border-t md:border-t-0 border-line'
              )}
            >
              <span
                aria-hidden
                className="font-soft font-light text-[44px] md:text-[56px] leading-none tracking-tight text-accent"
              >
                {step.number}
              </span>
              <Heading level={4} className="text-fg-strong">
                {step.title}
              </Heading>
              <Body size="sm" className="text-fg-muted leading-relaxed">
                {step.body}
              </Body>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
