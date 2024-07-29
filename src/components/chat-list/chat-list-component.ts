import './chat-list-component.scss';
import { Block, connect, Props, State } from '../../core';
import ChatLisTemplate from './chat-list-component.hbs?raw';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';
import { ChatListItem } from '../chat-list-item/chat-list-item-component';
import store from '../../core/Store';
import { UserResponse } from '../../shared/interfaces/UserResponse';
import { requestChatToken } from '../../api-services/ws-service';

type ChatListProps = Props & {
  messages?: ChatsResponse[];
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
    if (oldProps.messages !== newProps.messages) {
      this.lists.messages = newProps.messages?.map((message: ChatsResponse) => {
        return message;
      });
    }
    return true;
  }
}

export const setActiveChat = (user: UserResponse, chatId: number): void => {
  store.dispatch({
    type: 'ACTIVE_CHAT',
    id: chatId,
  });

  requestChatToken(user.id, chatId);
};

export const chatlist = connect(ChatList, (state: State) => ({
  messages: state.chats?.map((message: ChatsResponse) => {
    return new ChatListItem({
      ...message,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          if (state.user) {
            setActiveChat(state.user, message.id);
          }
        },
      },
    });
  }),
}));
