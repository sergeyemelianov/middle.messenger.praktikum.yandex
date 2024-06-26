import './login-page.scss';
import Block, { Props } from '../../core/Block';
import LoginPageTemplate from './login-page.hbs?raw';
import PageContainer, {
  PageContainerClassNameEnum,
} from '../../components/page-container/page-container-component';
import AuthComponent, { AuthEnum } from '../../components/auth/auth-component';
import LoginComponent from '../../components/login/login-component';

type LoginPageProps = Props & {};

export default class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      component: new PageContainer({
        className: PageContainerClassNameEnum.centered,
        component: new AuthComponent({
          type: AuthEnum.login,
          component: new LoginComponent({
            type: AuthEnum.login,
          }),
        }),
      }),
    });
  }

  render(): string {
    return LoginPageTemplate;
  }
}
