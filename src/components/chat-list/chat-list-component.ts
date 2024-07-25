import './chat-list-component.scss';
import { Block, connect, Props, State } from '../../core';
import ChatLisTemplate from './chat-list-component.hbs?raw';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';
import { ChatListItem } from '../chat-list-item/chat-list-item-component';
import store from '../../core/Store';

type ChatListProps = Props & {
  messages?: ChatsResponse[];
};

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  render(): string {
    return ChatLisTemplate;
  }
}

function setActiveChat(chatId: number): void {
  store.dispatch({
    type: 'ACTIVE_CHAT',
    id: chatId,
  });
}

export const chatlist = connect(ChatList, (state: State) => {
  return {
    messages: state.chats?.map((message: ChatsResponse) => {
      console.log('MESSAGE', message);
      return new ChatListItem({
        ...message,
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault();
            setActiveChat(message.id);
          },
        },
      });
    }),
  };
});
