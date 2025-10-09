// app/components/StrengthBars.jsx (or wherever)
export default function StrengthBars({ count = 0 }) {
    // 0..4 bars; fill left-to-right with severity colors
    const filled = [
        'bg-red-500 border-red-500',     // 1st bar
        'bg-amber-500 border-amber-500', // 2nd
        'bg-yellow-400 border-yellow-400', // 3rd
        'bg-emerald-500 border-emerald-500', // 4th
    ];

    return (
        <div className="flex items-end gap-1" aria-label="Strength bars">
            {[0, 1, 2, 3].map((i) => {
                const isOn = i < count;
                return (
                    <div
                        key={i}
                        className={[
                            'w-2 rounded',
                            isOn ? filled[i] : 'bg-[#e9e9e9] dark:bg-[#515151]',
                        ].join(' ')}
                        style={{ height: 12 + i * 4 }}
                    />
                );
            })}
        </div>
    );
}
