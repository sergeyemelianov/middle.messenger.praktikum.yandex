import './chatboard-page.scss';
import { Block, Props } from '../../core';
import Button from '../../components/button/button-component';
import ChatboardTemplate from './chatboard-page.hbs?raw';
import Input from '../../components/input/input-component';
import { chat, Modal } from '../../components';
import { pagesListNav, router } from '../../index';
import { form } from '../../components/form/form-component';
import { PagesEnum } from '../../shared/enums/Pages';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';
import { chatlist } from '../../components';

type ChatboardProps = Props & {
  chats?: ChatsResponse[];
};

export class Chatboard extends Block {
  constructor(props: ChatboardProps) {
    super({
      ...props,
      list: new chatlist({}),
      chat: new chat({}),
      buttonAddChat: new Button({
        view: 'secondary',
        page: 'profile',
        selector: 'add-or-delete',
        label: 'Create chat',
        iconName: 'add',
        iconSize: 'medium',
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault();
            this.toggleShowModal();
          },
        },
      }),
      buttonModalClose: new Button({
        view: 'secondary',
        label: 'x',
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault();
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
      form: new form({
        form: new Modal({
          name: 'title',
          placeholder: 'Enter the name of chat',
          onClick: () => {
            setTimeout(() => {
              this.toggleCloseModal();
            }, 0);
          },
        }),
        type: PagesEnum.modalAddChat,
      }),
    });
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
