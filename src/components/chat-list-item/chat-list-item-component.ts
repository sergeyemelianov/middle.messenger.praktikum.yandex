import './chat-list-item-component.scss';
import Block, { Props } from '../../core/Block';
import ChatListItemTemplate from './chat-list-item-component.hbs?raw';
import Avatar from '../avatar/avatar-component';

type ChatListItemProps = Props & {
  id?: number;
  conversation: Record<string, any>;
  unreadMessages: number;
};

export class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    super({
      ...props,
      userAvatar: new Avatar({
        avatar: props.conversation.avatar as string | undefined,
        size: 'medium',
      }),
      id: props.id,
      name: props.conversation.name,
      messageText: props.conversation.messageText,
      timestamp: props.conversation.timestamp.slice(11, 16),
      unreadMessages: props.unreadMessages,
    });
  }

  render(): string {
    return ChatListItemTemplate;
  }
}
