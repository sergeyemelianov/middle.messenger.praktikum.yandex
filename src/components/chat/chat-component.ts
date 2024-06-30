import './chat-component.scss';
import Block, { Props } from '../../core/Block';
import ChatTemplate from './chat-component.hbs?raw';
import Avatar from '../avatar/avatar-component';
import Button from '../button/button-component';
import Input from '../input/input-component';
import { Message } from '../message/message-component';

type ChatProps = Props & {
  message: Record<string, any>;
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
        (el: Record<string, any>) =>
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
