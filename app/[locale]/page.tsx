import PasswordGenerator from '@/components/password/PasswordGenerator'
import PasswordUsp from '@/components/layout/PasswordUsps'
import PasswordFaqs from '@/components/layout/PasswordFaqs'

export const dynamic = 'force-static';
export const revalidate = false;

export default function HomePage() {    
    return (
        <>
            <div className='py-28'>
                <PasswordGenerator/>
            </div>
            <PasswordUsp/>
            <PasswordFaqs/>
        </>
    )
}
