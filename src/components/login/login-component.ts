import './login-component.scss';
import Block, { Props } from '../../core/Block';
import Input from '../input/input-component';
import Button from '../../components/button';
import LoginComponentTemplate from './login-component.hbs?raw';
import { validate } from '../../utils/validation.util';

type LoginComponentProps = Props & {
  type?: string;
};

export default class LoginComponent extends Block {
  constructor(props: LoginComponentProps) {
    super({
      ...props,
      inputLogin: new Input({
        type: 'text',
        selector: 'edit',
        label: 'Username',
        name: 'login',
        showLabel: true,
        showDivider: true,
        onChange: (e?: string): void => {
          if (!e) {
            return;
          }
          validate('login', e);
        },
        onBlur: (e?: string): void => {
          if (!e) {
            return;
          }
          validate('login', e);
        },
      }),
      inputPassword: new Input({
        type: 'password',
        selector: 'edit',
        label: 'Password',
        name: 'password',
        showLabel: true,
        showDivider: true,
        onChange: (e?: string): void => {
          if (!e) {
            return;
          }
          validate('password', e);
        },
        onBlur: (e?: string): void => {
          if (!e) {
            return;
          }
          validate('password', e);
        },
      }),
      buttonConfirm: new Button({
        type: 'confirmation',
        page: 'chatboard',
        label: 'Confirm',
      }),
      buttonSignUp: new Button({
        type: 'link',
        page: 'signup',
        label: 'Create account',
      }),
    });
  }

  render(): string {
    return LoginComponentTemplate;
  }
}
