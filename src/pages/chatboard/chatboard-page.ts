import './chatboard-page.scss';
import { Block, connect, Props, State } from '../../core';
import Button from '../../components/button/button-component';
import ChatboardTemplate from './chatboard-page.hbs?raw';
import Input from '../../components/input/input-component';
import { Chat, ChatList, ChatListItem, Modal } from '../../components';
import { pagesListNav, router } from '../../index';
import { Form } from '../../components/form/form-component';
import { PagesEnum } from '../../shared/enums/Pages';
import { getChatsService } from '../../api-services/chat-service';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';
import Avatar from '../../components/avatar/avatar-component';
import store from '../../core/Store';

type ChatboardProps = Props;

export class Chatboard extends Block {
  constructor(props: ChatboardProps) {
    super({
      ...props,
      buttonAddChat: new Button({
        view: 'secondary',
        page: 'profile',
        iconName: 'add',
        iconSize: 'medium',
        events: {
          click: () => {
            this.toggleShowModal();
          },
        },
      }),
      buttonModalClose: new Button({
        view: 'secondary',
        label: 'x',
        events: {
          click: () => {
            this.toggleCloseModal();
          },
        },
      }),
      buttonProfile: new Button({
        view: 'secondary',
        label: 'Profile',
        page: 'profile',
        iconName: 'arrow-right',
        iconSize: 'small',
        events: {
          click: () => {
            router.go(pagesListNav.profileDetails);
          },
        },
      }),
      searchbar: new Input({
        type: 'search',
        selector: 'search',
        placeholder: 'Search',
      }),
      chat: new Form({
        form: new Chat({
          formAddUser: new Form({
            form: new Modal({ name: 'login', placeholder: 'Enter login name of user to add' }),
            type: PagesEnum.modalAddUser,
          }),
          formDeleteUser: new Form({
            form: new Modal({ name: 'login', placeholder: 'Enter login name of user to delete' }),
            type: PagesEnum.modalDeleteUser,
          }),
        }),
      }),
      form: new Form({
        form: new Modal({ name: 'title', placeholder: 'Enter the name of chat' }),
        type: PagesEnum.modalAddChat,
      }),
    });

    getChatsService();
  }

  toggleShowModal(): void {
    this.setProps({
      showModal: true,
    });
  }

  toggleCloseModal(): void {
    this.setProps({
      showModal: false,
    });
  }

  setActiveChat(chatId: number): void {
    store.dispatch({
      type: 'ACTIVE_CHAT',
      id: chatId,
    })
  }

  render(): string {
    return ChatboardTemplate;
  }

  override componentDidUpdate(oldProps: State, newProps: State): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.children.list = new ChatList({
          messages: newProps.chats?.map((message: ChatsResponse) => {
           return new ChatListItem({
             userAvatar: new Avatar({
               avatar: message.avatar,
               size: 'medium',
             }),
             name: `${message.last_message?.user?.first_name} ${message.last_message?.user?.second_name}`,
             messageText: message.last_message?.content,
             timestamp: message.last_message?.time?.slice(11, 16),
             unreadMessages: message.unread_count,
             events: {
               click: (e: MouseEvent) => {
                 e.preventDefault();
                 this.setActiveChat(message.id);
               }
             }
            });
          }),
        })
    }
    return true;
  }
}

const chatborad = connect(Chatboard);
export const ChatboardPage = new chatborad({});
