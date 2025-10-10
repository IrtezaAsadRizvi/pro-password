export default function Head() {
    const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ProPassword",
        url: "https://propassword.web.app",
        logo: "https://propassword.web.app/propassword_logo_512x512.png",
        sameAs: [
            "https://github.com/IrtezaAsadRizvi"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
            />
        </>
    );
}