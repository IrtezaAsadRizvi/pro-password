import { ReactNode } from "react";

import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

type Props = {
    children: ReactNode;
    params: { locale: Locale };
};
const LOCALES = ["en", "fr"] as const;
type Locale = typeof LOCALES[number];

export default function RootLayout({ children, params: { locale } }: Props) {

    return (
        <html lang={locale}>
            <head>
                {/* Tailwind */}
                <link rel="preload" href="/styles.css" as="style" />
                <link
                    rel="stylesheet"
                    href="/styles.css"
                    media="print"
                    data-preload-css
                />
                {/* react-tooltip */}
                <link rel="preload" href="/vendor/react-tooltip.css" as="style" />
                <link
                    rel="stylesheet"
                    href="/vendor/react-tooltip.css"
                    media="print"
                    data-preload-css
                />
                {/* Promote non-blocking CSS without React handlers */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(){
                            var links = document.querySelectorAll('link[data-preload-css]');
                            links.forEach(function(l){
                                if (l.media === 'print') {
                                l.addEventListener('load', function(){ l.media = 'all'; });
                                }
                            });
                            })();
                            `,
                    }}
                />
                <noscript>
                    <link rel="stylesheet" href="/styles.css" />
                    <link rel="stylesheet" href="/vendor/react-tooltip.css" />
                </noscript>
            </head>
            <body className={`${dmSans.className}`}>{children}</body>
        </html>
    );
}
