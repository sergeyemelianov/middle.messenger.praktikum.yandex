import './login-component.scss';
import { Block, Props } from '../../core';
import Input from '../input/input-component';
import Button from '../button/button-component';
import LoginTemplate from './login-component.hbs?raw';
import { pagesListNav, router } from '../../index';

type LoginProps = Props & {
  type?: string;
};

const inputState = {
  showDivider: true,
};

export class Login extends Block {
  constructor(props: LoginProps) {
    super({
      ...props,
      inputList: [
        new Input({
          ...inputState,
          type: 'text',
          selector: 'edit',
          label: 'Username',
          name: 'login',
        }),
        new Input({
          ...inputState,
          type: 'password',
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
      buttonSignUp: new Button({
        view: 'link',
        page: 'signup',
        label: 'Create account',
        events: {
          click: () => {
            router.go(pagesListNav.signup);
          },
        },
      }),
    });
  }

  render(): string {
    return LoginTemplate;
  }
}
