import './message-component.scss';
import Block, { Props } from '../../core/Block';
import MessageTemplate from './message-component.hbs?raw';
import { userData } from '../../data-chat/user-data';

type MessageProps = Props & {
  message: Record<string, any>;
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
