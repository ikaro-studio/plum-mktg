import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';
import Eyebrow from '@/components/ui/Eyebrow';
import Heading from '@/components/ui/Heading';
import Body from '@/components/ui/Body';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }

  return (
    <div className="relative flex justify-center min-h-[calc(100vh-5rem)] py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-peach-veil opacity-70 dark:opacity-40" />
      <div className="relative flex flex-col justify-center max-w-md w-full px-6">
        <div className="flex flex-col items-center pb-10">
          <Logo width={48} height={48} className="text-fg-strong" />
          <Eyebrow className="mt-6 mb-3">Welcome</Eyebrow>
          <Heading level={3} className="text-center">
            Sign in to Plum
          </Heading>
          <Body size="sm" className="mt-3 text-center text-fg-muted">
            Your library is waiting where you left it.
          </Body>
        </div>
        <div className="rounded-xl bg-surface-elevated border border-line shadow-sm p-6">
          <AuthUI />
        </div>
      </div>
    </div>
  );
}
