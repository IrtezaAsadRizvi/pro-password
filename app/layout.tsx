// app/layout.tsx
import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import Script from "next/script";
import GAClient from "./ga-client";

import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "@/state/StoreProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

async function getEnMessages() {
    return (await import("../messages/en.json")).default;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
    const base = "https://propassword.web.app";
    const messages = await getEnMessages();

    return (
        <html lang="en" className={font.className}>
            <head>
                {/* Basics */}
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5"
                />

                {/* Site verification */}
                <meta
                    name="google-site-verification"
                    content="IbnfDAx_WMPPDWP_UAiB2ZNnjyu1oFcBOqfTqJ-qT64"
                />

                {/* Canonical + hreflang */}
                <link rel="canonical" href={`${base}/`} />
                <link rel="alternate" hrefLang="en" href={`${base}/`} />
                <link rel="alternate" hrefLang="fr" href={`${base}/fr`} />
                <link rel="alternate" hrefLang="x-default" href={`${base}/`} />

                {/* HTML Meta Tags */}
                <title>ProPassword – Free Secure Password Generator</title>
                <meta
                    name="description"
                    content="Create strong, unique passwords instantly. 100% Free."
                />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Facebook */}
                <meta property="og:url" content={`${base}/`} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="ProPassword – Free Secure Password Generator"
                />
                <meta
                    property="og:description"
                    content="Create strong, unique passwords instantly. 100% Free."
                />
                <meta
                    property="og:image"
                    content={`${base}/propassword_og.png`}
                />
                <meta property="og:site_name" content="ProPassword" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@yourhandle" />
                <meta
                    name="twitter:title"
                    content="ProPassword – Free Secure Password Generator"
                />
                <meta
                    name="twitter:description"
                    content="Create strong, unique passwords instantly. 100% Free."
                />
                <meta
                    name="twitter:image"
                    content={`${base}/propassword_og.png`}
                />
                <meta name="twitter:domain" content="propassword.web.app" />

                {/* Enable preloaded CSS */}
                <Script id="enable-preloaded-css" strategy="afterInteractive">
                    {`
            (function () {
              var links = document.querySelectorAll('link[data-preload-css]');
              links.forEach(function (l) {
                function enable(){ try{ l.media='all'; }catch(e){} }
                if (l.sheet) { enable(); }
                l.addEventListener('load', enable, { once: true });
              });
            })();
          `}
                </Script>

                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-DKNSWQG2L3"
                    strategy="afterInteractive"
                />
                <Script id="ga-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-DKNSWQG2L3', {
                        anonymize_ip: true,
                        send_page_view: false
                        });
                    `}
                </Script>
            </head>
            <body>
                <StoreProvider>
                    <NextIntlClientProvider locale="en" messages={messages}>
                        <Navigation />
                        {children}
                        <Footer />
                    </NextIntlClientProvider>
                </StoreProvider>
                <GAClient />
            </body>
        </html>
    );
}
