// https://stackoverflow.com/a/7033662/5699993
export function chunkString(str: string, length: number) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
