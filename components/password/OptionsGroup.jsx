import Checkbox from '@/components/controls/Checkbox';
import { useTranslations } from 'next-intl'

export default function OptionsGroup({
    useUpper, setUseUpper,
    useLower, setUseLower,
    useNumber, setUseNumber,
    useSymbol, setUseSymbol,
}) {
    const t = useTranslations('Tool')
    return (
        <fieldset className="grid grid-cols-1 gap-3">
            <Checkbox label={t('uppercase_letters')} checked={useUpper} onChange={setUseUpper} />
            <Checkbox label={t('lowercase_letters')} checked={useLower} onChange={setUseLower} />
            <Checkbox label={t('numbers')} checked={useNumber} onChange={setUseNumber} />
            <Checkbox label={t('symbols')} checked={useSymbol} onChange={setUseSymbol} />
        </fieldset>
    );
}
