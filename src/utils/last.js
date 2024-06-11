export function last(list) {
    return !Array.isArray(list) ? undefined : !list.length ? undefined : list[list.length - 1];
}