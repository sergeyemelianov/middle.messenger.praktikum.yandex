import './chat-list-component.scss';
import { Block, connect, Props, State } from '../../core';
import ChatLisTemplate from './chat-list-component.hbs?raw';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';
import { ChatListItem } from '../chat-list-item/chat-list-item-component';
import store from '../../core/Store';
import { UserResponse } from '../../shared/interfaces/UserResponse';

type ChatListProps = Props & {
  chats?: ChatsResponse[];
  user?: UserResponse;
};

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  render(): string {
    return ChatLisTemplate;
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.lists.chats = newProps.chats?.map((chat: ChatsResponse) => {
        return chat;
      });
    }
    return true;
  }
}

export const setActiveChat = (chatId: number): void => {
  store.dispatch({
    type: 'ACTIVE_CHAT',
    id: chatId,
  });
};

export const chatlist = connect(ChatList, (state: State) => ({
  chats: state.chats?.map((chats: ChatsResponse) => {
    return new ChatListItem({
      ...chats,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          if (state.user) {
            setActiveChat(chats.id);
          }
        },
      },
      ...(chats.last_message && {
        avatar: `https://ya-praktikum.tech/api/v2/resources${chats.last_message.user?.avatar}`,
      }),
    });
  }),
}));
