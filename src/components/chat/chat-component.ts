import './chat-component.scss';
import { Block, Props } from '../../core';
import ChatTemplate from './chat-component.hbs?raw';
import Avatar from '../avatar/avatar-component';
import Button from '../button/button-component';
import Input from '../input/input-component';
import { Message } from '../message/message-component';
import { getCommonChatService } from '../../api-services/chat-service';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';

type ChatProps = Props & {
};

export class Chat extends Block {
  emptyStateText?: string;
  isActive?: boolean;

  constructor(props: ChatProps) {
    super({
      ...props,
    });

    console.log('!!!!!!!!!!!!!!props', props);
  }

  override componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.activeChatId !== newProps.activeChatId) {
      this.isActive = false;
      getCommonChatService(newProps.activeChatId);
      return true;
    }


    if (oldProps.messages !== newProps.messages) {
      this.children = {
        userAvatar: new Avatar({
          avatar: newProps.messages[0].avatar as string | undefined,
          size: 'small',
        }),
        userName: newProps.messages[0].last_message.user.first_name,
        buttonAttachFile: new Button({
          view: 'no-text',
          iconName: 'attach-file',
        }),
        messages: newProps.messages.map(
          (el: ChatsResponse) =>
            new Message({
              message: el.last_message.content,
              timestamp: el.last_message.time?.slice(11, 16),
              isAuthor: el.last_message.user === this.props.user
            }),
        ),
        buttonSend: new Button({
          view: 'confirmation',
          iconName: 'arrow-confirm',
        }),
        buttonAddUser: new Button({
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
      }
      this.lists = {
        inputList: [
          new Input({
            name: 'message',
            type: 'text',
            selector: 'message',
            placeholder: 'Type a message',
          }),
        ],
      }
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
