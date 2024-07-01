import './chat-component.scss';
import Block, { Props } from '../../core/Block';
import ChatTemplate from './chat-component.hbs?raw';
import Avatar from '../avatar/avatar-component';
import Button from '../button/button-component';
import Input from '../input/input-component';
import { Message } from '../message/message-component';
import { ChatType, Conversation } from '../chat-list-item/chat-list-item-component';

type ChatProps = Props & {
  message: ChatType;
};

export class Chat extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      userAvatar: new Avatar({
        avatar: props.message.participant.avatar as string | undefined,
        size: 'small',
      }),
      notActive: false,
      emptyStateText: 'Choose chat to send a message',
      userName: props.message.participant.name,
      buttonAttachFile: new Button({
        view: 'no-text',
        iconName: 'attach-file',
      }),
      messages: props.message.conversation.map(
        (el: Conversation) =>
          new Message({
            userId: el.userId,
            message: el.message,
            timestamp: el.timestamp.slice(11, 16),
          }),
      ),
      inputList: [
        new Input({
          name: 'message',
          type: 'text',
          selector: 'message',
          placeholder: 'Type a message',
        }),
      ],
      buttonSend: new Button({
        type: 'submit',
        view: 'confirmation',
        iconName: 'arrow-confirm',
      }),
    });
  }

  render(): string {
    return ChatTemplate;
  }
}
