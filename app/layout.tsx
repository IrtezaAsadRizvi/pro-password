import { ReactNode } from "react";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import GAClient from "./ga-client";

import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const LOCALES = ["en", "fr"] as const;
type Locale = (typeof LOCALES)[number];

type Props = {
    children: ReactNode;
    params: { locale: Locale };
};

export default function RootLayout({ children, params: { locale } }: Props) {
    const base = "https://propassword.web.app";
    const canon = `${base}/${locale}`;

    return (
        <html lang={locale} className={dmSans.className}>
            <head>
                <link rel="canonical" href={canon} />
                <link rel="alternate" hrefLang="en" href={`${base}/en`} />
                <link rel="alternate" hrefLang="fr" href={`${base}/fr`} />
                <link rel="alternate" hrefLang="x-default" href={`${base}/en`} />

                <Script id="enable-preloaded-css" strategy="beforeInteractive">
                    {`
                        (function () {
                        var links = document.querySelectorAll('link[data-preload-css]');
                        links.forEach(function (l) {
                            // If already loaded from cache, CSSStyleSheet may be present.
                            // We still attach a one-time load just in case.
                            function enable(){ try{ l.media='all'; }catch(e){} }
                            if (l.sheet) { enable(); }
                            l.addEventListener('load', enable, { once: true });
                        });
                        })();
                    `}
                </Script>

                {/* <noscript>
                    {cssLinks.map(({ href }) => (
                        <link key={`ns-${href}`} rel="stylesheet" href={href} />
                    ))}
                </noscript> */}

                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${'G-DKNSWQG2L3'}`} strategy="afterInteractive" />
                    <Script id="ga-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${'G-DKNSWQG2L3'}', {
                        anonymize_ip: true,
                        send_page_view: false
                        });
                    `}
                    </Script>
                </>
            </head>
            <body>
                {children}
                <GAClient />
            </body>
        </html>
    );
}
