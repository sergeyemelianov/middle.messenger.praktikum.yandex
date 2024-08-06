import './signup-component.scss';
import { Block, Props } from '../../core';
import Input from '../input/input-component';
import Button from '../button/button-component';
import SignupTemplate from './signup-component.hbs?raw';
import { pagesListNav, router } from '../../index';

type SignupProps = Props & {
  type?: string;
};

const inputState = {
  type: 'text',
  showDivider: true,
};

export class Signup extends Block {
  constructor(props: SignupProps) {
    super({
      ...props,
      inputList: [
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Email',
          name: 'email',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Login',
          name: 'login',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Name',
          name: 'first_name',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Second name',
          name: 'second_name',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Phone number',
          name: 'phone',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Password',
          name: 'password',
        }),
      ],
      buttonConfirm: new Button({
        type: 'submit',
        view: 'confirmation',
        page: 'chatboard',
        label: 'Confirm',
      }),
      buttonLogin: new Button({
        view: 'link',
        page: 'login',
        label: 'Already have an account?',
        events: {
          click: () => router.go(pagesListNav.login),
        },
      }),
    });
  }

  render(): string {
    return SignupTemplate;
  }
}
