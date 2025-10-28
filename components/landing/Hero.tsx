"use client"
import Logo from "../common/Logo"
import PasswordGenerator from "@/components/password/PasswordGenerator";
import { useTranslations } from "next-intl";

const Hero = () => {
    const t = useTranslations('Landing')
    return (
        <section className="w-full py-28">
            <div className="max-w-[1400px] mx-auto flex justify-between px-6">
                <div className="flex flex-col justify-center">
                    <h1 className="mb-8 text-start text-4xl font-semibold tracking-tight text-gray-900
                        dark:text-gray-100 sm:text-6xl max-w-2xl">{t('title')}</h1>
                    <p className="text-xl !leading-[150%] tracking-[-0.02em] font-medium 
                        [&_a]:px-px [&_a]:transition-all [&_a]:text-secure-blue [&_a]:border-2 
                        [&_a]:border-transparent [&_a]:rounded [&_a]:underline hover:[&_a]:text-secure-blue 
                        hover:[&_a]:no-underline focus:[&_a]:text-secure-blue focus:[&_a]:outline-none 
                        focus:[&_a]:border-secure-blue focus:[&_a]:no-underline text-pure-white text-left">{t('subtitle')}</p>
                </div>
                <div className="min-w-[520px]">
                    <PasswordGenerator />
                </div>
            </div>
        </section>
    )
}

export default Hero
