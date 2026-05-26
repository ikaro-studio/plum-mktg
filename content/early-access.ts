export const earlyAccess = {
  cohort: 'Closed beta — round two',
  inputPlaceholder: 'you@yourbrand.com',
  submitLabel: 'Request access',
  helper: 'We invite in waves of 30 brands. Notes go out within a week.',
  success: {
    title: 'On the list.',
    body: 'We’ll write when round two opens.'
  },
  errors: {
    invalidEmail: 'That email doesn’t look right. Mind checking?',
    network: 'Something stalled on our end. Try again in a moment.',
    duplicate: 'You’re already on the list — sit tight.'
  }
} as const;
