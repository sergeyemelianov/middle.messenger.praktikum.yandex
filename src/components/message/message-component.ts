import './message-component.scss';
import { Block, Props } from '../../core';
import MessageTemplate from './message-component.hbs?raw';
import { userData } from '../../data-chat/user-data';
import { MessageType } from '../chat-list-item/chat-list-item-component';

type MessageProps = Props & {
  message: MessageType;
  timestamp: string;
  userId: number;
};

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
      isAuthor: props.userId === userData.userId ? 'author' : 'not-author',
      messageText: props.message.text,
      messageImage: props.message.image,
      timestamp: props.timestamp,
      messageIsRead: props.message.isRead,
    });
  }

  render(): string {
    return MessageTemplate;
  }
}
