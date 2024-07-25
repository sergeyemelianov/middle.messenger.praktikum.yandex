import './chat-list-item-component.scss';
import { Block, Props } from '../../core';
import ChatListItemTemplate from './chat-list-item-component.hbs?raw';

type ChatListItemProps = Props & {
  userAvatar?: Block;
  name?: string;
  messageText?: string;
  timestamp?: string;
  unreadMessages?: number;
};

export class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    super({
      ...props,
    })
  }

  render(): string {
    return ChatListItemTemplate;
  }
}
