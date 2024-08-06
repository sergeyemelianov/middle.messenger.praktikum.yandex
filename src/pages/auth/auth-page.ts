import './auth-page.scss';
import { Block, Props } from '../../core';
import AuthComponentTemplate from './auth-page.hbs?raw';
import { Login } from '../../components/login/login-component';
import { Signup } from '../../components/signup/signup-component';
import { Form } from '../../components/form/form-component';
import { UserResponse } from '../../shared/interfaces/UserResponse';
import { PagesType } from '../../shared/types/PagesType';
import { PagesEnum } from '../../shared/enums/Pages';

type AuthPageProps = Props & {
  type?: PagesType;
  component?: Block;
  user?: UserResponse;
};

export class AuthPage extends Block {
  constructor(props: AuthPageProps) {
    console.log('USER IN AUTH', props.user);
    super({ ...props, type: props.type, user: props.user });
  }

  render(): string {
    return AuthComponentTemplate;
  }
}

export const LoginPage = new AuthPage({
  type: PagesEnum.login,
  component: new Form({
    form: new Login({ type: PagesEnum.login }),
    type: PagesEnum.login,
  }),
});

export const SignupPage = new AuthPage({
  type: PagesEnum.signup,
  component: new Form({
    form: new Signup({ type: PagesEnum.signup }),
    type: PagesEnum.signup,
  }),
});
