import './auth-component.scss';
import Block, { Props } from '../../core/Block';
import AuthComponentTemplate from './auth-component.hbs?raw';

export type AuthOptions = AuthEnum;

export enum AuthEnum {
  login = 'login',
  signup = 'signup',
}

type AuthComponentProps = Props & {
  type?: AuthOptions;
};

export default class AuthComponent extends Block {
  constructor(props: AuthComponentProps) {
    super({ ...props, component: props.component });
  }

  render(): string {
    return AuthComponentTemplate;
  }
}
