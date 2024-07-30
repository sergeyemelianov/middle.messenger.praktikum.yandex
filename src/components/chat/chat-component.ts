import './chat-component.scss';
import { Block, connect, Props, State } from '../../core';
import ChatTemplate from './chat-component.hbs?raw';
import Button from '../button/button-component';
import Input from '../input/input-component';
import { Message } from '../message/message-component';
import { requestChatToken } from '../../api-services/ws-service';
import { WsChatResponse } from '../../shared/interfaces/WsChatResponse';
import { form } from '../form/form-component';
import { Modal } from '../modal/modal';
import { PagesEnum } from '../../shared/enums/Pages';

type ChatProps = Props & {
  activeChatId?: number;
  userId?: number;
  messages?: WsChatResponse[];
};

export class Chat extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      inputList: [
        new Input({
          name: 'message',
          type: 'text',
          selector: 'message',
          placeholder: 'Type a message',
        }),
      ],
      formAddUser: new form({
        form: new Modal({
          name: 'login',
          placeholder: 'Enter login name of user to add',
          onClick: () => {
            setTimeout(() => {
              this.toggleCloseModal();
            }, 0);
          },
        }),
        type: PagesEnum.modalAddUser,
      }),
      formDeleteUser: new form({
        form: new Modal({
          name: 'login',
          placeholder: 'Enter login name of user to delete',
          onClick: () => {
            setTimeout(() => {
              this.toggleCloseModal();
            }, 0);
          },
        }),
        type: PagesEnum.modalDeleteUser,
      }),
      buttonSend: new Button({
        view: 'confirmation',
        iconName: 'arrow-confirm',
      }),
      buttonAddUser: new Button({
        type: 'button',
        view: 'secondary',
        page: 'profile',
        iconName: 'add',
        iconSize: 'medium',
        events: {
          click: () => {
            this.toggleShowAddModal();
          },
        },
      }),
      buttonDeleteUser: new Button({
        type: 'button',
        view: 'secondary',
        page: 'profile',
        iconName: 'delete',
        iconSize: 'medium',
        events: {
          click: () => {
            this.toggleShowDeleteModal();
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
      buttonAttachFile: new Button({
        view: 'no-text',
        iconName: 'attach-file',
      }),
    });
  }

  override componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.activeChatId !== newProps.activeChatId) {
      if (typeof newProps.activeChatId === 'number') {
        requestChatToken(newProps.userId, newProps.activeChatId);
        this.setProps({
          isActive: true,
        });
      } else {
        this.setProps({
          isActive: false,
        });
      }
    }

    if (oldProps.messages !== newProps.messages) {
      this.lists = {
        messages: newProps.messages.map(
          (el: WsChatResponse) =>
            new Message({
              message: el.content,
              timestamp: el.time?.slice(11, 16),
              isAuthor: el.user_id === newProps.userId,
              isRead: el.is_read,
            }),
        ),
        ...this.lists,
      };
    }
    return true;
  }

  render(): string {
    return ChatTemplate;
  }

  toggleShowAddModal(): void {
    this.setProps({
      showAddUserModal: true,
      showDeleteUserModal: false,
    });
  }

  toggleShowDeleteModal(): void {
    this.setProps({
      showAddUserModal: false,
      showDeleteUserModal: true,
    });
  }

  toggleCloseModal(): void {
    this.setProps({
      showAddUserModal: false,
      showDeleteUserModal: false,
    });
  }
}

export const chat = connect(Chat, (state: State) => ({
  activeChatId: state?.activeChatId,
  userId: state.user?.id,
  messages: state?.messages,
}));
