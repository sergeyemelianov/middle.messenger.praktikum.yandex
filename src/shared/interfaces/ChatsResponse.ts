import { ChatsResponseLastMessage } from './ChatsResponseLastMessage';

export interface ChatsResponse {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: ChatsResponseLastMessage;
}
