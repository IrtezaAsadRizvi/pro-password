export const routing = {
  locales: ['en', 'fr'] as const,
  defaultLocale: 'en',
  localePrefix: 'as-needed' as const, // literal, not widened to string
};