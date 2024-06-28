export function firstUtil(list: Record<string, any>[]): Record<string, any> | undefined {
  if (!Array.isArray(list)) {
    return undefined;
  }

  if (!list.length) {
    return undefined;
  }

  return list[0];
}
