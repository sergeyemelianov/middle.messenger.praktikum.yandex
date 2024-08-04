import './chat-input.scss';
import { Block, Props } from '../../core';
import ChatInputTemplate from './chat-input.hbs?raw';
import Input from '../input/input-component';
import Button from '../button/button-component';

type ChatInputProps = Props;

export default class ChatInput extends Block {
  constructor(props: ChatInputProps) {
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
      buttonAttachFile: new Button({
        view: 'no-text',
        iconName: 'attach-file',
      }),
      buttonSend: new Button({
        type: 'submit',
        view: 'confirmation',
        iconName: 'arrow-confirm',
      }),
    });
  }

  render(): string {
    return ChatInputTemplate;
  }
}
