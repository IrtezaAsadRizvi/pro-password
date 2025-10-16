"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Faq = { q: string; a: React.ReactNode };

const faqs: Faq[] = [
    {
        q: "How does the password generator work?",
        a: (
            <>
                <p>
                    The generator creates random passwords based on your choices—length,
                    easy-to-say/read, and whether to include uppercase, lowercase, numbers, and symbols.
                </p>
                <p>
                    Each result is checked with the widely used <em>zxcvbn</em> library to estimate strength.
                </p>
            </>
        ),
    },
    {
        q: "How do I create a strong password?",
        a: (
            <>
                <p>
                    Keep it unique and long—aim for 15+ characters with a mix of letters, numbers, and symbols.
                    Avoid common words and personal info.
                </p>
                <p>
                    The built-in generator makes a fresh, complex password every time—great for new accounts
                    or replacing weak ones.
                </p>
            </>
        ),
    },
    {
        q: "Can a strong password be hacked?",
        a: (
            <p>
                Theoretically yes; practically not for a very long time. A 12-char password with numbers,
                letters, and symbols can push crack times into{" "}
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
    },
    {
        q: "Is your password generator safe?",
        a: (
            <>
                <p>
                    Yes. Passwords are created randomly from your options and checked with zxcvbn for strength.
                    If you save them in your{" "}
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
    },
    {
        q: "Is the password stored in your system?",
        a: (
            <>
                <p>
                    No. This tool runs fully in your browser. We don’t send or store your password on any server.
                </p>
                <p>
                    Generation and strength checks happen in-memory on your device. Copy and save it where you
                    prefer, and clear your clipboard if you’re on a shared machine.
                </p>
            </>
        ),
    },
];

export default function PasswordFaqs({
    title = "Frequently asked questions",
    items = faqs,
}: {
    title?: string;
    items?: Faq[];
}) {
    const [open, setOpen] = useState<Set<number>>(new Set());

    const toggle = (i: number) =>
        setOpen((prev) => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });

    return (
        <div className="bg-white dark:bg-neutral-950">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl text-center">
                        {title}
                    </h2>

                    <dl className="mt-16 divide-y divide-gray-900/10 dark:divide-white/10">
                        {items.map((faq, i) => {
                            const isOpen = open.has(i);
                            const panelId = `faq-panel-${i}`;
                            const buttonId = `faq-button-${i}`;
                            return (
                                <div
                                    key={faq.q}
                                    className="group py-6 first:pt-0 last:pb-0"
                                    data-open={isOpen ? "true" : undefined}
                                >
                                    <dt>
                                        <button
                                            id={buttonId}
                                            aria-controls={panelId}
                                            aria-expanded={isOpen}
                                            onClick={() => toggle(i)}
                                            className="flex w-full items-start justify-between text-left text-gray-900 outline-none dark:text-gray-100"
                                        >
                                            <span className="text-xl font-semibold">{faq.q}</span>
                                            <span className="ml-6 flex h-7 items-center">
                                                <Plus aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                                                <Minus aria-hidden="true" className="size-6 hidden group-data-[open]:block" />
                                            </span>
                                        </button>
                                    </dt>

                                    <dd
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={buttonId}
                                        className={`pr-12 transition-[height,opacity] duration-200 ease-out ${isOpen ? "mt-2 opacity-100" : "h-0 overflow-hidden opacity-0"
                                            }`}
                                    >
                                        <div className="text-base/7 text-gray-600 dark:text-gray-300">{faq.a}</div>
                                    </dd>
                                </div>
                            );
                        })}
                    </dl>
                </div>
            </div>
        </div>
    );
}