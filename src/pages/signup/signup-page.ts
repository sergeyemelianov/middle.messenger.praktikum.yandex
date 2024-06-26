import './signup-page.scss';
import Block, { Props } from '../../core/Block';
import PageContainer, {
  PageContainerClassNameEnum,
} from '../../components/page-container/page-container-component';
import AuthComponent, { AuthEnum } from '../../components/auth/auth-component';
import LoginComponent from '../../components/login/login-component';

import SignupPageTemplate from './signup-page.hbs?raw';

type SignupPageProps = Props & {};

export default class SignupPage extends Block {
  constructor(props: SignupPageProps) {
    super({
      ...props,
      component: new PageContainer({
        className: PageContainerClassNameEnum.centered,
        component: new AuthComponent({
          type: AuthEnum.signup,
          component: new LoginComponent({
            type: AuthEnum.signup,
          }),
        }),
      }),
    });
  }

  render(): string {
    return SignupPageTemplate;
  }
}
