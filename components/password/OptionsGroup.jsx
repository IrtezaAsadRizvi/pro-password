import Checkbox from '@/components/controls/Checkbox';

export default function OptionsGroup({
    useUpper, setUseUpper,
    useLower, setUseLower,
    useNumber, setUseNumber,
    useSymbol, setUseSymbol,
}) {
    return (
        <fieldset className="grid grid-cols-1 gap-3">
            <Checkbox label="Uppercase Letters" checked={useUpper} onChange={setUseUpper} />
            <Checkbox label="Lowercase Letters" checked={useLower} onChange={setUseLower} />
            <Checkbox label="Numbers" checked={useNumber} onChange={setUseNumber} />
            <Checkbox label="Symbols" checked={useSymbol} onChange={setUseSymbol} />
        </fieldset>
    );
}
