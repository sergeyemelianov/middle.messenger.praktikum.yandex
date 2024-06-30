import { Conversation } from '../../components';

export function lastUtil(list: Conversation[]): Conversation | undefined {
  if (!Array.isArray(list)) {
    return undefined;
  }

  if (!list.length) {
    return undefined;
  }

  return list[list.length - 1];
}
