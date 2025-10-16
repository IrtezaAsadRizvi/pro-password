import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import StoreProvider from "@/state/StoreProvider";

export const dynamic = 'force-static';
export const revalidate = false;



const LOCALES = ["en", "fr"] as const;
type Locale = typeof LOCALES[number];

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export const metadata: Metadata = {
  title: "ProPassword – Free Secure Password Generator",
  description: "Create strong, unique passwords instantly. 100% Free.",
  metadataBase: new URL('https://propassword.web.app'),
  icons: {
    icon: '/favicon.ico', // or '/icon.png'
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'fr': '/fr',
      'x-default': '/',
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://propassword.web.app',
    title: 'ProPassword – Free Secure Password Generator',
    description: 'Create strong, unique passwords instantly. 100% Free.',
    siteName: 'ProPassword',
    images: [{ url: '/og/og-cover.png', width: 1200, height: 630, alt: 'ProPassword' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourhandle',
    title: 'ProPassword – Free Secure Password Generator',
    description: 'Create strong, unique passwords instantly. 100% Free.',
    images: ['/og/og-cover.png'],
  },
};

async function getMessages(locale: Locale): Promise<AbstractIntlMessages> {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export function generateStaticParams(): Array<{ locale: Locale }> {
  return LOCALES.map((l) => ({ locale: l }));
  // Alternatively:
  // return [{ locale: "en" as const }, { locale: "fr" as const }];
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages(locale);

  return (
        <StoreProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navigation />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </StoreProvider>
  );
}
