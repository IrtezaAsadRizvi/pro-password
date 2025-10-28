// middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createIntlMiddleware({
  locales: [...routing.locales], // mutable string[]
  defaultLocale: routing.defaultLocale,
  localePrefix: 'as-needed',      // pass literal directly
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'], // adjust if you also want to exclude /api
};
