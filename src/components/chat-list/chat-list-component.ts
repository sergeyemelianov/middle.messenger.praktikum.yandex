import './chat-list-component.scss';
import Block, { Props } from '../../core/Block';
import ChatLisTemplate from './chat-list-component.hbs?raw';

type ChatListProps = Props;

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  render(): string {
    return ChatLisTemplate;
  }
}
