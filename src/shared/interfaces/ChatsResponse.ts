import { ChatsResponseLastMessage } from './ChatsResponseLastMessage';

export interface ChatsResponse {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  last_message: ChatsResponseLastMessage;
}
