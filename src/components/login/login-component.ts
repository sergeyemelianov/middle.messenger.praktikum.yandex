import './login-component.scss';
import Block, { Props } from '../../core/Block';
import Input from '../input/input-component';
import Button from '../button/button-component';
import LoginTemplate from './login-component.hbs?raw';
import { navigate, pagesList } from '../../index';

type LoginProps = Props & {
  type?: string;
};

export class Login extends Block {
  constructor(props: LoginProps) {
    super({
      ...props,
      inputList: [
        new Input({
          type: 'text',
          selector: 'edit',
          label: 'Username',
          name: 'login',
          showLabel: true,
          showDivider: true,
        }),
        new Input({
          type: 'password',
          selector: 'edit',
          label: 'Password',
          name: 'password',
          showLabel: true,
          showDivider: true,
        }),
      ],
      buttonConfirm: new Button({
        type: 'confirmation',
        page: 'chatboard',
        label: 'Confirm',
      }),
      buttonSignUp: new Button({
        type: 'link',
        page: 'signup',
        label: 'Create account',
        events: {
          click: () => {
            navigate(pagesList.signup);
          },
        },
      }),
    });
  }

  render(): string {
    return LoginTemplate;
  }
}
