// app/components/PasswordFaqs.tsx  (server component)
import React from "react";

type Faq = { q: string; a: React.ReactNode; aText: string };

const faqs: Faq[] = [
    {
        q: "How does the password generator work?",
        a: (
            <>
                <p>
                    The generator creates random passwords based on your choices—length,
                    easy-to-say/read, and whether to include uppercase, lowercase, numbers, and symbols.
                </p>
                <p>Each result is checked with the widely used <em>zxcvbn</em> library to estimate strength.</p>
            </>
        ),
        aText:
            "The generator creates random passwords from your chosen options. Each result is checked with the zxcvbn library to estimate strength.",
    },
    {
        q: "How do I create a strong password?",
        a: (
            <>
                <p>
                    Keep it unique and long—aim for 15+ characters with a mix of letters, numbers, and symbols. Avoid common
                    words and personal info.
                </p>
                <p>
                    The built-in generator makes a fresh, complex password every time—great for new accounts or replacing weak
                    ones.
                </p>
            </>
        ),
        aText:
            "Use 15+ characters with letters, numbers, and symbols. Avoid common words and personal info. The generator creates strong, unique passwords.",
    },
    {
        q: "Can a strong password be hacked?",
        a: (
            <p>
                Theoretically yes; practically not for a very long time. A 12-char password with numbers, letters, and symbols
                can push crack times into{" "}
                <a
                    href="https://www.hivesystems.io/blog/are-your-passwords-in-the-green"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                >
                    thousands of years
                </a>
                .
            </p>
        ),
        aText:
            "In theory yes, but a strong 12+ character password can take an extremely long time to crack with current methods.",
    },
    {
        q: "Is your password generator safe?",
        a: (
            <>
                <p>
                    Yes. Passwords are created randomly from your options and checked with zxcvbn for strength. If you save them
                    in your{" "}
                    <a href="/features/password-vault" className="underline hover:no-underline">
                        vault
                    </a>
                    , they’re{" "}
                    <a href="/security/zero-knowledge-security" className="underline hover:no-underline">
                        encrypted
                    </a>{" "}
                    so only you can read them.
                </p>
            </>
        ),
        aText:
            "Yes. Passwords are generated locally and can be stored encrypted in your vault so only you can read them.",
    },
    {
        q: "Is the password stored in your system?",
        a: (
            <>
                <p>No. This tool runs fully in your browser. We don’t send or store your password on any server.</p>
                <p>
                    Generation and strength checks happen in-memory on your device. Copy and save it where you prefer, and clear
                    your clipboard if you’re on a shared machine.
                </p>
            </>
        ),
        aText:
            "No. Everything runs in your browser; nothing is sent or stored on our servers. Clear your clipboard on shared devices.",
    },
];

export default function PasswordFaqs({
    title = "Frequently asked questions",
    openFirst = true,
}: {
    title?: string;
    openFirst?: boolean;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, aText }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: aText },
        })),
    };

    return (
        <div className="bg-white dark:bg-neutral-950">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-center text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                        {title}
                    </h2>

                    <dl className="mt-16 divide-y divide-gray-900/10 dark:divide-white/10">
                        {faqs.map((faq, i) => (
                            <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                                <details className="group" {...(openFirst && i === 0 ? { open: true } : {})}>
                                    <summary className="flex w-full list-none cursor-pointer items-start justify-between text-left text-gray-900 dark:text-gray-100">
                                        <span className="text-xl font-semibold">{faq.q}</span>
                                        <span aria-hidden className="ml-6 h-7 select-none text-gray-700 dark:text-gray-300">
                                            <span className="group-open:hidden text-2xl leading-none">＋</span>
                                            <span className="hidden group-open:inline text-2xl leading-none">−</span>
                                        </span>
                                    </summary>

                                    <dd className="pr-12 open:mt-2 text-base/7 text-gray-600 dark:text-gray-300">
                                        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-out group-open:grid-rows-[1fr] group-open:opacity-100">
                                            <div className="min-h-0">{faq.a}</div>
                                        </div>
                                    </dd>
                                </details>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
