import './auth-page.scss';
import Block, { Props } from '../../core/Block';
import AuthComponentTemplate from './auth-page.hbs?raw';
import { Login } from '../../components/login/login-component';
import { Signup } from '../../components/signup/signup-component';

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
    super({ ...props, component: props.component });
  }

  render(): string {
    return AuthComponentTemplate;
  }
}

export const LoginPage = new AuthPage({
  type: AuthEnum.login,
  component: new Login({ type: AuthEnum.login }),
});

export const SignupPage = new AuthPage({
  type: AuthEnum.signup,
  component: new Signup({ type: AuthEnum.signup }),
});
