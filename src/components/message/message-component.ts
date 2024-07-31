import './message-component.scss';
import { Block, Props,  } from '../../core';
import MessageTemplate from './message-component.hbs?raw';

type MessageProps = Props & {
  message?: string;
  timestamp?: string;
  isAuthor?: boolean;
  isRead?: boolean;
};

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
      isAuthor: props.isAuthor ? 'author' : 'not-author',
      messageText: props.message,
      timestamp: props.timestamp,
      messageIsRead: props.isRead,
    });
  }

  render(): string {
    return MessageTemplate;
  }
}
