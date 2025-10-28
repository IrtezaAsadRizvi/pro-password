'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  titleKey?: string;   // optional: override title key if you want
  openFirst?: boolean;
};

export default function PasswordFaqs({
  titleKey = 'Faqs.title',
  openFirst = true,
}: Props) {
  const t = useTranslations('Faqs');

  const faqs = [
    {
      q: t('faq1_q'),
      a: (
        <>
          <p>{t('faq1_a_p1')}</p>
          <p>
            {t.rich('faq1_a_p2', {
              em: (chunks: React.ReactNode) => <em>{chunks}</em>,
            })}
          </p>
        </>
      ),
      aText: t('faq1_aText'),
    },
    {
      q: t('faq2_q'),
      a: (
        <>
          <p>{t('faq2_a_p1')}</p>
          <p>{t('faq2_a_p2')}</p>
        </>
      ),
      aText: t('faq2_aText'),
    },
    {
      q: t('faq3_q'),
      a: (
        <p>
          {t.rich('faq3_a_p1', {
            a: (chunks: React.ReactNode) => (
              <a
                href="https://www.hivesystems.io/blog/are-your-passwords-in-the-green"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      ),
      aText: t('faq3_aText'),
    },
    {
      q: t('faq4_q'),
      a: (
        <p>
          {t('faq4_a_p1_before')}{' '}
          <a href="/features/password-vault" className="underline hover:no-underline">
            {t('vault_label')}
          </a>
          {t('faq4_a_p1_mid')}
          <a
            href="/security/zero-knowledge-security"
            className="underline hover:no-underline"
          >
            {t('encrypted_label')}
          </a>
          {t('faq4_a_p1_after')}
        </p>
      ),
      aText: t('faq4_aText'),
    },
    {
      q: t('faq5_q'),
      a: (
        <>
          <p>{t('faq5_a_p1')}</p>
          <p>{t('faq5_a_p2')}</p>
        </>
      ),
      aText: t('faq5_aText'),
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, aText }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: aText },
    })),
  };

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {t(titleKey.replace('Faqs.', ''))}
          </h2>

          <dl className="mt-16 divide-y divide-gray-900/10 dark:divide-white/10">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                <details
                  className="group"
                  {...(openFirst && i === 0 ? { open: true } : {})}
                >
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
        // Keep JSON-LD stable; avoid passing a function
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
