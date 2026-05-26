'use client';

import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({
  session,
  user,
  products,
  subscription
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/signin');
    }
    if (subscription) {
      return router.push('/account');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <section>
        <div className="max-w-6xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <p className="eyebrow text-center mb-4">PRICING</p>
            <h1 className="text-4xl font-bold text-plum-800 sm:text-center sm:text-6xl tracking-display">
              Plans take shape soon
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-lg text-ink-2 sm:text-center">
              No subscription pricing plans yet. Create them in your{' '}
              <a
                className="text-rose-500 hover:text-rose-400 underline underline-offset-4"
                href="https://dashboard.stripe.com/products"
                rel="noopener noreferrer"
                target="_blank"
              >
                Stripe Dashboard
              </a>
              .
            </p>
          </div>
          <LogoCloud />
        </div>
      </section>
    );

  if (products.length === 1)
    return (
      <section>
        <div className="max-w-6xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <p className="eyebrow text-center mb-4">PRICING</p>
            <h1 className="text-4xl font-bold text-plum-800 sm:text-center sm:text-6xl tracking-display">
              One brand. One library. One plan.
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-lg text-ink-2 sm:text-center">
              Drop your brand in. We keep the assets, you keep the focus.
            </p>
            <div className="relative flex self-center mt-12 rounded-full bg-white border border-line p-1">
              <div className="px-6 py-2 text-base font-medium text-plum-800 rounded-full bg-cream-200">
                {products[0].name}
              </div>
            </div>
            <div className="mt-12 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {products[0].prices?.map((price) => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency!,
                    minimumFractionDigits: 0
                  }).format(price.unit_amount / 100);

                return (
                  <div
                    key={price.interval}
                    className="rounded-lg bg-white border border-line shadow-sm hover:shadow-md transition-shadow duration-200 ease-soft"
                  >
                    <div className="p-6">
                      <p>
                        <span className="text-5xl font-extrabold text-plum-800 tracking-display">
                          {priceString}
                        </span>
                        <span className="text-base font-medium text-ink-2 ml-1">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="mt-4 text-ink-2">{price.description}</p>
                      <Button
                        variant="primary"
                        size="sm"
                        type="button"
                        loading={priceIdLoading === price.id}
                        onClick={() => handleCheckout(price)}
                        className="block w-full mt-8"
                      >
                        {products[0].name ===
                        subscription?.prices?.products?.name
                          ? 'Manage'
                          : 'Subscribe'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <LogoCloud />
        </div>
      </section>
    );

  return (
    <section>
      <div className="max-w-6xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <p className="eyebrow text-center mb-4">PRICING</p>
          <h1 className="text-4xl font-bold text-plum-800 sm:text-center sm:text-6xl tracking-display">
            Pick the plan that fits your library.
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-lg text-ink-2 sm:text-center">
            Plum scales with your brand — from one designer to an international
            agency. Every plan includes the same source of truth.
          </p>
          <div className="relative self-center mt-8 bg-white rounded-full p-1 flex border border-line">
            {intervals.includes('month') && (
              <button
                onClick={() => setBillingInterval('month')}
                type="button"
                className={cn(
                  'relative rounded-full py-2 px-6 text-sm font-medium whitespace-nowrap transition duration-200 ease-soft',
                  billingInterval === 'month'
                    ? 'bg-plum-800 text-cream-100 shadow-sm'
                    : 'text-ink-2 hover:text-plum-800'
                )}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes('year') && (
              <button
                onClick={() => setBillingInterval('year')}
                type="button"
                className={cn(
                  'relative rounded-full py-2 px-6 text-sm font-medium whitespace-nowrap transition duration-200 ease-soft',
                  billingInterval === 'year'
                    ? 'bg-plum-800 text-cream-100 shadow-sm'
                    : 'text-ink-2 hover:text-plum-800'
                )}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);
            const isActive = subscription
              ? product.name === subscription?.prices?.products?.name
              : product.name === 'Freelancer';
            return (
              <div
                key={product.id}
                className={cn(
                  'rounded-lg bg-white border border-line shadow-sm hover:shadow-md transition-shadow duration-200 ease-soft',
                  {
                    'ring-2 ring-rose-500 ring-offset-2 ring-offset-cream-100':
                      isActive
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-plum-800">
                    {product.name}
                  </h2>
                  <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold text-plum-800 tracking-display">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-ink-2 ml-1">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    disabled={!session}
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="block w-full mt-8"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <LogoCloud />
      </div>
    </section>
  );
}

function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-xs uppercase text-ink-3 text-center font-bold tracking-eyebrow">
        Built on
      </p>
      <div className="flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-4 opacity-60">
        <div className="flex items-center justify-center">
          <a href="https://nextjs.org" aria-label="Next.js Link">
            <img
              src="/nextjs.svg"
              alt="Next.js Logo"
              className="h-10 filter grayscale"
            />
          </a>
        </div>
        <div className="flex items-center justify-center">
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="h-5 filter grayscale"
            />
          </a>
        </div>
        <div className="flex items-center justify-center">
          <a href="https://stripe.com" aria-label="stripe.com Link">
            <img
              src="/stripe.svg"
              alt="stripe.com Logo"
              className="h-10 filter grayscale"
            />
          </a>
        </div>
        <div className="flex items-center justify-center">
          <a href="https://supabase.io" aria-label="supabase.io Link">
            <img
              src="/supabase.svg"
              alt="supabase.io Logo"
              className="h-8 filter grayscale"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
