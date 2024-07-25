import './modal.scss';
import { Block, Props } from '../../core';
import ModalTemplate from './modal.hbs?raw';
import Input from '../input/input-component';
import Button from '../button/button-component';
import { ValidateSourceType } from '../../shared/types/ValidateSourceType';

type ModalProps = Props & {
  type?: string;
  placeholder?: string;
  name?: ValidateSourceType;
};

export class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      inputList: [
        new Input({
          type: 'text',
          name: props.name,
          placeholder: props.placeholder,
        }),
      ],
      buttonModal: new Button({
        type: 'submit',
        view: 'confirmation',
        page: 'chatboard',
        label: 'Confirm',
      }),
    });
  }

  render(): string {
    return ModalTemplate;
  }
}
