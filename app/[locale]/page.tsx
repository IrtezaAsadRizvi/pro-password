// app/page.tsx
'use client'
import { useTranslations } from 'next-intl'
import PasswordGenerator from '@/components/password/PasswordGenerator'


export default function HomePage() {
    const t = useTranslations('HomePage')


    return (
        <>
            <PasswordGenerator/>
        </>
    )
}
