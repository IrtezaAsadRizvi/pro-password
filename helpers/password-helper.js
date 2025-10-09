// stricter, pattern-aware password evaluator
const COMMON = new Set([
    'password', '123456', '123456789', 'qwerty', '111111', '123123', 'letmein',
    'abc123', '1234', 'iloveyou', 'admin', 'welcome', 'monkey', 'dragon', 'football',
    'passw0rd', 'qwertyuiop', 'asdfgh', 'zaq12wsx', 'baseball', 'sunshine', 'trustno1'
]);

const CLASSES = {
    upp: /[A-Z]/, low: /[a-z]/, num: /[0-9]/, sym: /[^A-Za-z0-9]/,
};

const ROWS = [
    'abcdefghijklmnopqrstuvwxyz',
    'qwertyuiopasdfghjklzxcvbnm',
    '0123456789'
];

function countSeqRuns(pw) {
    const s = pw.toLowerCase();
    let penalty = 0;

    // keyboard / alpha / numeric sequences in both directions
    for (const row of ROWS) {
        const rev = row.split('').reverse().join('');
        [row, rev].forEach(line => {
            let run = 1;
            for (let i = 1; i < s.length; i++) {
                const a = s[i - 1], b = s[i];
                const ia = line.indexOf(a), ib = line.indexOf(b);
                if (ia !== -1 && ib !== -1 && ib - ia === 1) {
                    run++;
                    if (run >= 3) penalty += 3; // stricter: 3 bits per step in a run
                } else {
                    run = 1;
                }
            }
        });
    }
    return penalty;
}

function hasDatePatterns(pw) {
    const s = pw.replace(/[^0-9]/g, '');
    const year = /(19|20)\d{2}/.test(s);
    const md = /((0?[1-9])|(1[0-2]))((0?[1-9])|([12]\d)|(3[01]))/.test(s); // MMDD
    const dm = /((0?[1-9])|([12]\d)|(3[01]))((0?[1-9])|(1[0-2]))/.test(s); // DDMM
    return year || md || dm;
}

function hasRepeatedBlocks(pw) {
    // e.g., aaaa, abab, 123123
    if (/(.)\1{2,}/.test(pw)) return true;          // same char ≥3
    const half = Math.floor(pw.length / 2);
    const left = pw.slice(0, half), right = pw.slice(half);
    return left.length >= 3 && left === right;      // ABAB
}

export function evalPassword(pw) {
    if (!pw) return { bars: 0, label: 'NONE', entropyBits: 0, details: { charset: 0, len: 0 } };

    const L = pw.length;
    const has = {
        upp: CLASSES.upp.test(pw),
        low: CLASSES.low.test(pw),
        num: CLASSES.num.test(pw),
        sym: CLASSES.sym.test(pw),
    };
    const classCount = Object.values(has).filter(Boolean).length;
    const S = (has.upp ? 26 : 0) + (has.low ? 26 : 0) + (has.num ? 10 : 0) + (has.sym ? 33 : 0);

    // Base entropy on used charset only
    let bits = L * Math.log2(Math.max(S, 1));

    // Hard stops for extremely common passwords
    if (COMMON.has(pw.toLowerCase())) {
        return { bars: 1, label: 'TOO WEAK!', entropyBits: 10, details: { charset: S, len: L } };
    }

    // --- Penalties (strict) ---
    // short length
    if (L < 8) bits -= 40;
    else if (L < 10) bits -= 25;
    else if (L < 12) bits -= 12;

    // duplication
    const freq = {};
    for (const ch of pw) freq[ch] = (freq[ch] || 0) + 1;
    const duplicates = Object.values(freq).reduce((a, c) => a + Math.max(0, c - 1), 0);
    bits -= duplicates * 2.5;

    // repeated blocks (aaaa, abab, 123123)
    if (hasRepeatedBlocks(pw)) bits -= 18;

    // keyboard/alpha/numeric sequences
    bits -= countSeqRuns(pw);

    // date/year patterns
    if (hasDatePatterns(pw)) bits -= 15;

    // numeric-only special treatment
    if (has.num && !has.upp && !has.low && !has.sym) {
        bits -= L * 2;        // heavy penalty
    }

    // two-class / one-class caps
    if (classCount === 1) bits = Math.min(bits, 34);          // cap to WEAK range
    if (classCount === 2) bits = Math.min(bits, 60);          // cap to MEDIUM ceiling

    // small bonus for diversity (3–4 classes)
    bits += Math.max(0, (classCount - 2)) * 2;

    bits = Math.max(0, Math.round(bits));

    // Stricter mapping
    let bars, label;
    if (bits < 35) { bars = 1; label = 'TOO WEAK!'; }
    else if (bits < 50) { bars = 2; label = 'WEAK'; }
    else if (bits < 75) { bars = 3; label = 'MEDIUM'; }
    else { bars = 4; label = 'STRONG'; }

    // Enforce strong requirements: length ≥12 and ≥3 classes
    if (bars === 4 && (L < 12 || classCount < 3)) {
        bars = 3; label = 'MEDIUM';
    }

    return { bars, label, entropyBits: bits, details: { charset: S, len: L, classes: classCount } };
}
