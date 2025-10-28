// app/page.tsx
import Hero from "@/components/landing/Hero";
import PasswordUsp from "@/components/layout/PasswordUsps";
import PasswordFaqs from "@/components/layout/PasswordFaqs";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
    return (
        <>
            <Hero />
            <PasswordUsp />
            <PasswordFaqs />
        </>
    );
}
