import Checkbox from '@/components/controls/Checkbox';
import { useTranslations } from 'next-intl'

export default function OptionsGroup({
    useUpper, setUseUpper,
    useLower, setUseLower,
    useNumber, setUseNumber,
    useSymbol, setUseSymbol,

    // NEW props
    usePhrase, setUsePhrase,
    phrase, setPhrase,
}) {
    const t = useTranslations('Tool')
    return (
        <fieldset className="grid grid-cols-1 gap-5">        
            <div className='grid grid-cols-2 gap-5'>
                <Checkbox label={t('uppercase_letters')} checked={useUpper} onChange={setUseUpper} />
                <Checkbox label={t('lowercase_letters')} checked={useLower} onChange={setUseLower} />
                <Checkbox label={t('numbers')} checked={useNumber} onChange={setUseNumber} />
                <Checkbox label={t('symbols')} checked={useSymbol} onChange={setUseSymbol} />
            </div>
            {/* Phrase row */}
            <div className="flex items-center gap-5">
                <Checkbox
                    label={t('phrase') ?? 'Phrase'}
                    checked={usePhrase}
                    onChange={setUsePhrase}
                />
                {usePhrase && <input
                    type="text"
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                    placeholder={t('phrase_placeholder') ?? 'Type a phrase (used up to half length)'}
                    disabled={!usePhrase}
                    className="flex-1 font-medium text-black border-b-2 border-primary-text bg-transparent relative -top-1"
                    aria-disabled={!usePhrase}
                />}
            </div>
        </fieldset>
    );
}
