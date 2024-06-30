import './chat-list-item-component.scss';
import Block, { Props } from '../../core/Block';
import ChatListItemTemplate from './chat-list-item-component.hbs?raw';
import Avatar from '../avatar/avatar-component';

export interface ChatType {
  chatId: number;
  participant: ChatParticipant;
  conversation: Conversation[];
}

export type ChatParticipant = {
  userId: number;
  name: string;
  avatar: string;
};

export type MessageType = {
  text: string | null;
  image: string | null;
  isRead: boolean;
};

export interface Conversation {
  userId: number;
  name: string;
  avatar: string;
  message: MessageType;
  timestamp: string;
  owner: boolean;
}

type ChatListItemProps = Props & {
  id?: number;
  conversation: Conversation | undefined;
  unreadMessages: number;
};

export class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    super({
      ...props,
      userAvatar: new Avatar({
        avatar: props.conversation?.avatar,
        size: 'medium',
      }),
      id: props.id,
      name: props.conversation?.name,
      messageText: props.messageText,
      timestamp: props.conversation?.timestamp.slice(11, 16),
      unreadMessages: props.unreadMessages,
    });
  }

  render(): string {
    return ChatListItemTemplate;
  }
}
