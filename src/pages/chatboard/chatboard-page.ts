import './chatboard-page.scss';
import { Block, Props } from '../../core';
import Button from '../../components/button/button-component';
import ChatboardTemplate from './chatboard-page.hbs?raw';
import Input from '../../components/input/input-component';
import { Chat, Modal } from '../../components';
import { pagesListNav, router } from '../../index';
import { Form } from '../../components/form/form-component';
import { PagesEnum } from '../../shared/enums/Pages';
import { getChatsService } from '../../api-services/chat-service';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';
import { chatlist } from '../../components';
type ChatboardProps = Props & {
  messages?: ChatsResponse[];
};

export class Chatboard extends Block {
  constructor(props: ChatboardProps) {
    super({
      ...props,
      list: new chatlist({}),
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

  render(): string {
    return ChatboardTemplate;
  }
}

export const ChatboardPage = new Chatboard({});
