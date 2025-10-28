import styles from './LengthControl.module.css';
import { useTranslations } from 'next-intl'

export default function LengthControl({ length, onChange, min = 4, max = 64 }) {
    const t = useTranslations('Tool')
    const percent = ((length - min) / (max - min)) * 100;

    return (
        <div>
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t('character_length')}
                </label>
                <span className="text-primary-text dark:text-[#c666fc] font-semibold tabular-nums">
                    {length}
                </span>
            </div>

            <div
                className={`${styles.wrapper} mt-3`}
                /* set CSS variables for colors + fill; dark rest color via Tailwind */
                style={{ '--fill': `${percent}%`, '--fill-color': '#10B981' }}
            >
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={length}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    aria-label="Password length"
                    className={`${styles.range} w-full [--track-rest:#e4e4e7] dark:[--track-rest:#27272a]`}
                />
            </div>
        </div>
    );
}
