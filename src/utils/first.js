export function first(list) {
    return !Array.isArray(list) ? undefined : !list.length ? undefined : list[0];
}