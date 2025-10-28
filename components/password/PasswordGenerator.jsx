'use client';
import { useMemo, useState, useEffect } from 'react';
import { Clipboard, ClipboardCheck, ArrowRight } from 'lucide-react';
import { evalPassword } from '@/helpers/password-helper';
import { randIndex } from '@/helpers/utils';
import { useTranslations } from 'next-intl'

import DisplayBox from './DisplayBox';
import LengthControl from './LengthControl';
import OptionsGroup from './OptionsGroup';
import StrengthMeter from './StrengthMeter';

export default function PasswordGenerator() {    
    const t = useTranslations('Tool')
    const [length, setLength] = useState(12);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumber, setUseNumber] = useState(true);
    const [useSymbol, setUseSymbol] = useState(false);

    // NEW: phrase option
    const [usePhrase, setUsePhrase] = useState(false);
    const [phrase, setPhrase] = useState('');

    const [pwd, setPwd] = useState('');
    const [copied, setCopied] = useState(false);

    // character pools
    const UPP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOW = 'abcdefghijklmnopqrstuvwxyz';
    const NUM = '0123456789';
    const SYM = '!@#$%^&*()-_=+[]{};:,.?/|~';

    const pool = useMemo(() => {
        let s = '';
        if (useUpper) s += UPP;
        if (useLower) s += LOW;
        if (useNumber) s += NUM;
        if (useSymbol) s += SYM;
        return s;
    }, [useUpper, useLower, useNumber, useSymbol]);

    // strength from CURRENT password only
    const metrics = useMemo(() => evalPassword(pwd), [pwd]);
    const strength = { bars: metrics.bars, label: metrics.label };
    const entropyBits = metrics.entropyBits;

    function generate() {
        if (!pool.length || length < 4) {
            if (!pool.length) return setPwd('');
        }

        // --- phrase handling ---
        // 1) Trim and collapse internal spaces -> example: "sweet pillow" => "sweetpillow"
        const raw = (phrase || '').trim().replace(/\s+/g, '');
        const maxPhraseLen = Math.floor(length / 2);
        const phraseSlice = usePhrase && raw.length > 0
            ? raw.slice(0, maxPhraseLen)
            : '';
        const phraseLen = phraseSlice.length;

        // remaining length for random generation
        let remaining = Math.max(0, length - phraseLen);

        // --- picks for non-phrase part ---
        const picks = [];

        // ensure at least one from each selected set (best-effort if remaining is small)
        const sets = [];
        if (useUpper) sets.push(UPP);
        if (useLower) sets.push(LOW);
        if (useNumber) sets.push(NUM);
        if (useSymbol) sets.push(SYM);

        // take one from as many sets as possible within remaining
        for (let i = 0; i < sets.length && picks.length < remaining; i++) {
            const set = sets[i];
            picks.push(set[randIndex(set.length)]);
        }

        // fill remaining with full pool
        while (picks.length < remaining) picks.push(pool[randIndex(pool.length)]);

        // shuffle ONLY the non-phrase random part to keep phrase contiguous
        for (let i = picks.length - 1; i > 0; i--) {
            const j = randIndex(i + 1);
            [picks[i], picks[j]] = [picks[j], picks[i]];
        }

        // insert phrase slice at a random position
        let finalArr;
        if (phraseLen > 0) {
            const insertAt = randIndex(picks.length + 1); // 0..picks.length
            finalArr = [
                ...picks.slice(0, insertAt),
                ...phraseSlice.split(''),
                ...picks.slice(insertAt),
            ];
        } else {
            finalArr = picks;
        }

        setPwd(finalArr.join(''));
        setCopied(false);
    }

    async function copy() {
        if (!pwd) return;
        await navigator.clipboard.writeText(pwd);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    }

    // initial generate
    useEffect(() => { generate(); /* eslint-disable-next-line */ }, []);

    return (
        <div className="grid place-items-center px-4 py-5">
            <div className="w-full max-w-xl">
                <DisplayBox
                    value={pwd}
                    onCopy={copy}
                    copiedIcon={copied ? <ClipboardCheck className='text-green-600' /> : <Clipboard />}
                    generate={generate}
                />

                <div className="mt-4 rounded-xl bg-[#f1f1f1] dark:bg-[#212121] p-5 space-y-5">
                    <LengthControl
                        length={length}
                        onChange={setLength}
                    />

                    <OptionsGroup
                        useUpper={useUpper} setUseUpper={setUseUpper}
                        useLower={useLower} setUseLower={setUseLower}
                        useNumber={useNumber} setUseNumber={setUseNumber}
                        useSymbol={useSymbol} setUseSymbol={setUseSymbol}

                        // NEW props for phrase
                        usePhrase={usePhrase} setUsePhrase={setUsePhrase}
                        phrase={phrase} setPhrase={setPhrase}
                    />

                    <StrengthMeter
                        label={strength.label}
                        bars={strength.bars}
                        entropyBits={entropyBits}
                    />

                    <button
                        onClick={generate}
                        aria-label={t('generate')}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md
                            bg-gradient-to-r from-[#c766fc] to-[#575cfa] hover:opacity-95 
                            active:opacity-90 text-white font-semibold px-4 py-3 transition
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 
                            focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                            dark:focus-visible:ring-white/40 uppercase">
                        {t('generate')}
                        <ArrowRight />
                    </button>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-right">
                        Estimated entropy: <span className="tabular-nums">{entropyBits}</span> bits
                    </p>
                </div>
            </div>
        </div>
    );
}
