import { RefreshCcw } from "lucide-react";
import { useTranslations } from 'next-intl'
import { Tooltip } from 'react-tooltip'

export default function DisplayBox({ value, onCopy, copiedIcon, generate }) {
    const t = useTranslations('Tool')    

    return (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#f1f1f1] 
        dark:bg-[#212121] px-4 py-4 shadow-sm">
            <p
                data-tooltip-id="input-tooltip"
                data-tooltip-content={t('click_copy_password')}
                aria-label="Generated password"
                title={value} // show full text on hover
                className="inline-block max-w-[60vw] overflow-hidden text-ellipsis whitespace-nowrap
                            bg-transparent text-xl font-mono tracking-wide
                            text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400
                            rounded-lg border-none focus:outline-none focus-within:outline-none
                            focus:border-none focus:shadow-none focus:ring-offset-0 cursor-pointer"
                style={{ '--tw-ring-shadow': '0 0 #000 !important' }}
                onClick={onCopy}
                >
                {value}
                </p>

            <div className="flex">
                <button
                    onClick={onCopy}
                    data-tooltip-id="copy-tooltip" 
                    data-tooltip-content={t('copy_password')}
                    aria-label={t('copy_password')}
                    className="icon-button"
                    title="Copy password"
                >
                    {copiedIcon}
                </button>
                <button
                    onClick={generate}
                    data-tooltip-id="refresh-tooltip" 
                    data-tooltip-content={t('refresh_password')}
                    aria-label={t('refresh_password')}
                    className="icon-button"
                    title="Generate"
                >
                    <RefreshCcw />
                </button>
            </div>
            <Tooltip id="input-tooltip" />
            <Tooltip id="copy-tooltip" />
            <Tooltip id="refresh-tooltip" />
        </div>
    );
}
