import './auth-page.scss';
import { Block, Props } from '../../core';
import AuthComponentTemplate from './auth-page.hbs?raw';
import { Login } from '../../components/login/login-component';
import { Signup } from '../../components/signup/signup-component';
import { Form } from '../../components/form/form-component';

export type AuthOptions = AuthEnum;

export enum AuthEnum {
  login = 'login',
  signup = 'signup',
}

type AuthPageProps = Props & {
  type?: AuthOptions;
};

export class AuthPage extends Block {
  constructor(props: AuthPageProps) {
    super({ ...props, type: props.type });
  }

  render(): string {
    return AuthComponentTemplate;
  }
}

export const LoginPage = new AuthPage({
  type: AuthEnum.login,
  component: new Form({
    form: new Login({ type: AuthEnum.login }),
    type: AuthEnum.login,
  }),
});

export const SignupPage = new AuthPage({
  type: AuthEnum.signup,
  component: new Form({
    form: new Signup({ type: AuthEnum.signup }),
    type: AuthEnum.signup
  }),
});
