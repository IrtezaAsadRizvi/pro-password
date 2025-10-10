// app/components/StrengthBars.jsx
export default function StrengthBars({ count = 0 }) {
    const filled = [
        'bg-red-500 border-red-500',
        'bg-amber-500 border-amber-500',
        'bg-yellow-400 border-yellow-400',
        'bg-emerald-500 border-emerald-500',
    ];
    const value = Math.max(0, Math.min(4, Number(count)));

    return (
        <div
            className="flex items-end gap-1"
            role="progressbar"
            aria-label="Password strength"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={value}
        >
            {[0, 1, 2, 3].map((i) => {
                const isOn = i < value;
                return (
                    <div
                        key={i}
                        aria-hidden="true"
                        className={[
                            'w-2 rounded',
                            isOn ? filled[i] : 'bg-[#e9e9e9] dark:bg-[#515151]',
                        ].join(' ')}
                        style={{ height: 12 + i * 4 }}
                    />
                );
            })}
            <span className="sr-only">{`Strength ${value} of 4`}</span>
        </div>
    );
}
