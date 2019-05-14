// eslint-disable-next-line import/prefer-default-export
export function truncate(text: string, len: number) {
    if (text.length < len) {
        return text;
    }
    return `${text.substring(0, len)}...`;
}
