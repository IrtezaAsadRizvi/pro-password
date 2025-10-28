// app/layout.tsx
import { ReactNode } from "react";
import { DM_Sans, Poppins } from "next/font/google";
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
    weight: ["400", "500", "700"],
});

export const metadata = {
    metadataBase: new URL("https://propassword.web.app"),
    title: "ProPassword – Free Secure Password Generator",
    description: "Create strong, unique passwords instantly. 100% Free.",
    alternates: {
        canonical: "/",
        languages: {
            en: "/",
            fr: "/fr",
            "x-default": "/",
        },
    },
    robots: { index: true, follow: true },
    openGraph: {
        type: "website",
        url: "https://propassword.web.app",
        title: "ProPassword – Free Secure Password Generator",
        description: "Create strong, unique passwords instantly. 100% Free.",
        siteName: "ProPassword",
        images: [{ url: "/og/og-cover.png", width: 1200, height: 630, alt: "ProPassword" }],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        site: "@yourhandle",
        title: "ProPassword – Free Secure Password Generator",
        description: "Create strong, unique passwords instantly. 100% Free.",
        images: ["/og/og-cover.png"],
    },
};

async function getEnMessages() {
    return (await import("../messages/en.json")).default;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
    const base = "https://propassword.web.app";
    const messages = await getEnMessages();

    return (
        <html lang="en" className={font.className}>
            <head>
                <meta
                    name="google-site-verification"
                    content="IbnfDAx_WMPPDWP_UAiB2ZNnjyu1oFcBOqfTqJ-qT64"
                />

                {/* Canonical + hreflang for English root and French */}
                <link rel="alternate" hrefLang="en" href={`${base}/`} />
                <link rel="alternate" hrefLang="fr" href={`${base}/fr`} />
                <link rel="alternate" hrefLang="x-default" href={`${base}/`} />

                {/* Enable preloaded CSS (kept from your original) */}
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
                    src={`https://www.googletagmanager.com/gtag/js?id=${"G-DKNSWQG2L3"}`}
                    strategy="afterInteractive"
                />
                <Script id="ga-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${"G-DKNSWQG2L3"}', {
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
