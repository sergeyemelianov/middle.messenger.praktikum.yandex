export function last(list: Record<string, string>[]): Record<string, string> | undefined {
  if (!Array.isArray(list)) {
    return undefined;
  }

  if (!list.length) {
    return undefined;
  }

  return list[list.length - 1];
}
