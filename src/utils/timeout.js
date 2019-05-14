// eslint-disable-next-line import/prefer-default-export
export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
