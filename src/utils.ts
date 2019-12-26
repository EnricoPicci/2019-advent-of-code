// https://stackoverflow.com/a/7033662/5699993
export function chunkString(str: string, length: number) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

export function printArea(
    area: {
        [y: number]: {
            [x: number]: any;
        };
    },
    determineStringToPrint: (val: any) => string,
) {
    const _elementsOrderedPerY = sortKeys(area).map(y => area[y]);
    const minMaxX = _elementsOrderedPerY.reduce<{ minX: number; maxX: number }>(
        (acc, val) => {
            const xs = sortKeys(val);
            const thisMinX = Math.min(...xs);
            const thisMaxX = Math.max(...xs);
            const minX = Math.min(acc.minX, thisMinX);
            const maxX = Math.max(acc.maxX, thisMaxX);
            return { minX, maxX };
        },
        { minX: 0, maxX: 0 },
    );
    const _elementsOrderedPerXandY = _elementsOrderedPerY.map(line => {
        const _line: string[] = [];
        for (let i = minMaxX.minX; i <= minMaxX.maxX; i++) {
            const stringToPrint = determineStringToPrint(line[i]);
            _line.push(stringToPrint);
        }
        return _line;
    });
    const lines = _elementsOrderedPerXandY.map(line => line.join(''));
    lines.forEach(l => console.log(l));
}
function sortKeys(dictionary: { [k: number]: any }) {
    return Object.keys(dictionary)
        .map(k => parseInt(k))
        .sort((a, b) => b - a);
}
