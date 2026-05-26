export const home = {
  hero: {
    eyebrow: 'Digital asset management — closed beta',
    headline: 'A place a brand lives, intact.',
    body: 'We facilitate the incorporation and consolidation of brand assets — so your library stays the source of truth.',
    primaryCta: 'Request access',
    secondaryCta: 'See how it works',
    secondaryCtaHref: '#features'
  },
  betaStrip: {
    eyebrow: 'Round two opens soon',
    sentence:
      'We invite in waves of 30 brands. The next round opens at the end of the month.'
  },
  features: [
    {
      eyebrow: 'Specialty',
      headline: 'A library that holds shape.',
      body: 'Upload once. Every version, every variant, every locale stays organized — and stays itself. Nothing forks into a thousand near-copies on someone’s desktop.',
      points: [
        'One canonical version of every asset',
        'Variant tracking without folder spaghetti',
        'Search that respects how brands actually name things'
      ],
      mockVariant: 'library' as const
    },
    {
      eyebrow: 'Partnerships',
      headline: 'A workspace for everyone touching the brand.',
      body: 'Bring in freelancers, agencies, partner studios — give them precise access to precise collections. No more zip files; no more ten-day permission threads.',
      points: [
        'Scoped collections per partner',
        'Time-bounded access without sharing logins',
        'Audit trail of who downloaded what'
      ],
      mockVariant: 'workspace' as const
    },
    {
      eyebrow: 'Balance',
      headline: 'Collections that travel without breaking.',
      body: 'Hand off a campaign-ready collection to a producer in another timezone. Plum keeps the metadata, the usage rights, and the brand rules attached to the file.',
      points: [
        'Usage rights surfaced inline',
        'Brand rules travel with the asset',
        'Hand-offs in one link, not a folder tree'
      ],
      mockVariant: 'collections' as const
    }
  ],
  process: {
    eyebrow: 'How it works',
    headline: 'We open the library in waves.',
    body: 'Plum is invite-only during the beta. Each round we let in 30 brands — small enough to give every team real attention, big enough to keep the library humming.',
    steps: [
      {
        number: '01',
        title: 'Request access.',
        body: 'Drop your email below and we’ll add you to the list.'
      },
      {
        number: '02',
        title: 'Wait for the wave.',
        body: 'We open a round of invites at the end of each month.'
      },
      {
        number: '03',
        title: 'Settle into the library.',
        body: 'Your workspace is ready within a week of accepting.'
      }
    ]
  },
  cta: {
    eyebrow: 'Join the next wave',
    headline: 'Bloom your brand.',
    body: 'We invite in waves of 30 brands. Notes go out within a week of joining the list.'
  }
} as const;
