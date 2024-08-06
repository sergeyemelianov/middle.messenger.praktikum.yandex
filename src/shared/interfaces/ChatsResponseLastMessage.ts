import { UserResponse } from './UserResponse';

export interface ChatsResponseLastMessage {
  user?: UserResponse;
  time?: string;
  content?: string;
}
