import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }

  return (
    <div className="relative flex justify-center min-h-[calc(100vh-5rem)] py-12">
      {/* peach veil over hero zone */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-peach-veil opacity-70" />
      <div className="relative flex flex-col justify-center max-w-md w-full px-6">
        <div className="flex flex-col items-center pb-10">
          <Logo width={48} height={48} className="text-plum-800" />
          <p className="eyebrow mt-6 mb-3">WELCOME</p>
          <h1 className="text-3xl font-bold text-plum-800 tracking-display text-center">
            Sign in to Plum
          </h1>
          <p className="mt-3 text-ink-2 text-center text-sm">
            Your library is waiting where you left it.
          </p>
        </div>
        <div className="rounded-xl bg-white border border-line shadow-sm p-6">
          <AuthUI />
        </div>
      </div>
    </div>
  );
}
