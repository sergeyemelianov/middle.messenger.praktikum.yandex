import { ChatType } from '../../components';

export function firstUtil(list: ChatType[]): ChatType | undefined {
  if (!Array.isArray(list)) {
    return undefined;
  }

  if (!list.length) {
    return undefined;
  }

  return list[0];
}
