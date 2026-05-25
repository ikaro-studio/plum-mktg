import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';
import type { Database } from '@/types_db';

// React cache memoizes the Promise; subsequent callers in the same request
// receive the same client without rebuilding the cookie adapter.
export const createServerSupabaseClient = cache(async () => createClient());

// Explicit shapes for join queries. types_db.ts was generated for an older
// supabase-js and lacks the isOneToOne markers the new type inference needs,
// so we annotate the helpers' return types directly.
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type UserDetails = Database['public']['Tables']['users']['Row'];

export interface PriceWithProduct extends Price {
  products: Product | null;
}
export interface SubscriptionWithPrice extends Subscription {
  prices: PriceWithProduct | null;
}
export interface ProductWithPrices extends Product {
  prices: Price[];
}

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  try {
    // Verifies the JWT against Supabase Auth — never trust getSession()
    // on the server.
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) return null;

    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails(): Promise<UserDetails | null> {
  const supabase = await createServerSupabaseClient();
  try {
    const { data } = await supabase.from('users').select('*').single();
    return data as UserDetails | null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscription(): Promise<SubscriptionWithPrice | null> {
  const supabase = await createServerSupabaseClient();
  try {
    const { data } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return data as SubscriptionWithPrice | null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getActiveProductsWithPrices = async (): Promise<
  ProductWithPrices[]
> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return (data ?? []) as ProductWithPrices[];
};
