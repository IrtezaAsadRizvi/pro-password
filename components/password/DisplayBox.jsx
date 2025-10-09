import { RefreshCcw } from "lucide-react";

export default function DisplayBox({ value, onCopy, copiedIcon, generate }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-[#f1f1f1] 
        dark:bg-[#212121] px-4 py-4 shadow-sm">
            <input
                aria-label="Generated password"
                readOnly
                value={value}
                className="flex-1 bg-transparent !outline-none text-xl font-mono tracking-wide 
                    text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400
                    rounded-lg border-none focus:outline-none focus-within:outline-none
                    focus:border-none focus:shadow-none focus:ring-offset-0"
                style={{ '--tw-ring-shadow': '0 0 #000 !important' }}
                placeholder="Click Generate"
            />
            <div className="flex">
                <button
                    onClick={onCopy}
                    className="icon-button"
                    title="Copy password"
                >
                    {copiedIcon}
                </button>
                <button
                    onClick={generate}
                    className="icon-button"
                    title="Generate"
                >
                    <RefreshCcw />
                </button>
            </div>
        </div>
    );
}
