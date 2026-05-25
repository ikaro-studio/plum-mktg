import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
  {
    // Pinned to the SDK's default — bump intentionally when adopting new API features.
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2025-02-24.acacia',
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Plum',
      version: '0.1.0'
    }
  }
);
