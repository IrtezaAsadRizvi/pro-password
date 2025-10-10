import StrengthBars from '@/components/password/StrengthBars';
import { useTranslations } from 'next-intl'

export default function StrengthMeter({ label, bars, entropyBits }) {
    const t = useTranslations('Tool')
    const labelClass =
        bars <= 1
            ? 'text-red-600 dark:text-red-400'
            : bars === 2
                ? 'text-amber-600 dark:text-amber-400'
                : bars === 3
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-emerald-600 dark:text-emerald-400';

    return (
        <div className="flex items-center justify-between rounded-md bg-[#fbfbfb] dark:bg-[#121317] px-4 py-3">
            <span className="text-xs font-medium tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                {t('strength')}
            </span>
            <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${labelClass}`}>{t(label)}</span>
                <StrengthBars count={bars} />
            </div>
        </div>
    );
}
