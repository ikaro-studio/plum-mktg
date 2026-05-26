import ManageSubscriptionButton from './ManageSubscriptionButton';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import Button from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const updateName = async (formData: FormData) => {
    'use server';

    const newName = formData.get('name') as string;
    const supabase = await createClient();
    const session = await getSession();
    const user = session?.user;
    if (!user) return;
    // Cast: types_db.ts was generated for an older supabase-js. Regenerate via
    // `pnpm generate-types` against your live project to drop the cast.
    const { error } = await supabase
      .from('users')
      .update({ full_name: newName } as never)
      .eq('id', user.id);
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };

  const updateEmail = async (formData: FormData) => {
    'use server';

    const newEmail = formData.get('email') as string;
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };

  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <p className="eyebrow text-center mb-3">YOUR WORKSPACE</p>
          <h1 className="text-4xl font-bold text-plum-800 sm:text-center sm:text-6xl tracking-display">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-lg text-ink-2 sm:text-center">
            We partnered with Stripe to keep billing calm and out of the way.
          </p>
        </div>
      </div>
      <div className="p-4 max-w-3xl mx-auto">
        <Card
          title="Your plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={<ManageSubscriptionButton session={session} />}
        >
          <div className="mt-6 mb-2 text-2xl font-semibold text-plum-800 tracking-display">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link
                href="/"
                className="text-rose-500 hover:text-rose-400 underline underline-offset-4"
              >
                Choose your plan
              </Link>
            )}
          </div>
        </Card>
        <Card
          title="Your name"
          description="Please enter your full name, or a display name you are comfortable with."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0 text-ink-3 text-sm">
                64 characters maximum
              </p>
              <Button
                variant="secondary"
                size="sm"
                type="submit"
                form="nameForm"
                disabled={true}
              >
                Update name
              </Button>
            </div>
          }
        >
          <div className="mt-6 mb-2">
            <form id="nameForm" action={updateName}>
              <input
                type="text"
                name="name"
                className="w-full sm:w-1/2 p-3 rounded-md bg-white border border-line text-plum-800 placeholder:text-ink-3 focus:outline-none focus:border-rose-500 focus:shadow-focus transition duration-200 ease-soft"
                defaultValue={userDetails?.full_name ?? ''}
                placeholder="Your name"
                maxLength={64}
              />
            </form>
          </div>
        </Card>
        <Card
          title="Your email"
          description="Please enter the email address you want to use to sign in."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0 text-ink-3 text-sm">
                We will email you to verify the change.
              </p>
              <Button
                variant="secondary"
                size="sm"
                type="submit"
                form="emailForm"
                disabled={true}
              >
                Update email
              </Button>
            </div>
          }
        >
          <div className="mt-6 mb-2">
            <form id="emailForm" action={updateEmail}>
              <input
                type="text"
                name="email"
                className="w-full sm:w-1/2 p-3 rounded-md bg-white border border-line text-plum-800 placeholder:text-ink-3 focus:outline-none focus:border-rose-500 focus:shadow-focus transition duration-200 ease-soft"
                defaultValue={user ? user.email : ''}
                placeholder="Your email"
                maxLength={64}
              />
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-6 rounded-lg bg-white border border-line shadow-sm overflow-hidden">
      <div className="px-6 py-5">
        <h3 className="mb-1 text-xl font-semibold text-plum-800">{title}</h3>
        <p className="text-ink-2 text-sm leading-relaxed">{description}</p>
        {children}
      </div>
      <div className="px-6 py-4 border-t border-line bg-cream-100 text-ink-2">
        {footer}
      </div>
    </div>
  );
}
