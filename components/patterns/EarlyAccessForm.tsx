'use client';

import { ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Caption from '@/components/ui/Caption';
import Eyebrow from '@/components/ui/Eyebrow';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import { earlyAccess } from '@/content/early-access';
import { cn } from '@/lib/cn';

type Tone = 'inline' | 'panel';

type Props = {
  tone?: Tone;
  /** Source identifier (e.g. "home-hero", "footer", "dialog") for analytics. */
  source?: string;
  className?: string;
};

type State =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EarlyAccessForm({
  tone = 'inline',
  source,
  className
}: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setState({ kind: 'error', message: earlyAccess.errors.invalidEmail });
      return;
    }
    setState({ kind: 'submitting' });
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source })
      });
      if (res.ok) {
        setState({ kind: 'success' });
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setState({ kind: 'error', message: earlyAccess.errors.duplicate });
      } else if (res.status === 400 && data?.error === 'invalid_email') {
        setState({ kind: 'error', message: earlyAccess.errors.invalidEmail });
      } else {
        setState({ kind: 'error', message: earlyAccess.errors.network });
      }
    } catch {
      setState({ kind: 'error', message: earlyAccess.errors.network });
    }
  }

  const isPanel = tone === 'panel';

  if (state.kind === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col gap-2',
          isPanel && 'items-start',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <Heading level={4} className="text-fg-strong">
          {earlyAccess.success.title}
        </Heading>
        <p className="text-fg-muted text-[15px] leading-relaxed">
          {earlyAccess.success.body}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn('flex flex-col gap-3', className)}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor={`ea-${source ?? 'form'}`}>
          Email address
        </label>
        <Input
          id={`ea-${source ?? 'form'}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={earlyAccess.inputPlaceholder}
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            if (state.kind === 'error') setState({ kind: 'idle' });
          }}
          invalid={state.kind === 'error'}
          disabled={state.kind === 'submitting'}
          required
          className="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={state.kind === 'submitting'}
          rightIcon={ArrowRight}
          className="shrink-0"
        >
          {earlyAccess.submitLabel}
        </Button>
      </div>
      <div className="flex items-baseline gap-3 flex-wrap">
        <Eyebrow className="text-ink-3">{earlyAccess.cohort}</Eyebrow>
        <Caption className="text-ink-2">{earlyAccess.helper}</Caption>
      </div>
      {state.kind === 'error' && (
        <p
          className="text-[13px] text-rose-500 dark:text-peach-300"
          role="alert"
          aria-live="assertive"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
