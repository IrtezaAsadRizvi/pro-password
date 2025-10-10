import Script from "next/script";

export default function FAQPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Do you store generated passwords?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. Generation is 100% client-side and nothing is sent to our servers." } },
      { "@type": "Question", "name": "Is ProPassword free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. It’s free to use with no limits." } },
      { "@type": "Question", "name": "What length should I choose?",
        "acceptedAnswer": { "@type": "Answer", "text": "Use at least 16 characters with letters, numbers, and symbols for best security." } }
    ]
  };

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(faq)}
      </Script>

      {/* Visible FAQ content */}
      <h1>FAQ</h1>
      <h2>Do you store generated passwords?</h2>
      <p>No. Generation is 100% client-side…</p>
      <h2>Is ProPassword free?</h2>
      <p>Yes. It’s free to use…</p>
      <h2>What length should I choose?</h2>
      <p>Use at least 16 characters…</p>
    </>
  );
}
