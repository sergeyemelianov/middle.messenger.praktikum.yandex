import './navigation-component.scss';
import Block, { Props } from '../../core/Block';
import Button from '../button';

export { default as Navigation } from './navigation-component.hbs?raw';

type NavigationProps = Props & {
  className?: string;
};

export default class Navigation extends Block {
  constructor(props: NavigationProps) {
    super({
      ...props,
      buttonLogin: new Button({
        type: 'link',
        page: 'login',
        selector: 'nav-item',
        label: 'Login',
      }),
      buttonSignup: new Button({
        type: 'link',
        page: 'signup',
        selector: 'nav-item',
        label: 'Signup',
      }),
      buttonChatboard: new Button({
        type: 'link',
        page: 'chatboard',
        selector: 'nav-item',
        label: 'Chatboard',
      }),
      buttonProfile: new Button({
        type: 'link',
        page: 'profile',
        selector: 'nav-item',
        label: 'Profile',
      }),
      buttonProfileDetailsEdit: new Button({
        type: 'link',
        page: 'profile_details_edit',
        selector: 'nav-item',
        label: 'Edit user',
      }),
      buttonProfilePasswordEdit: new Button({
        type: 'link',
        page: 'profile_password_edit',
        selector: 'nav-item',
        label: 'Edit password',
      }),
      buttonError4xx: new Button({
        type: 'link',
        page: 'error4xx',
        selector: 'nav-item',
        label: '4xx',
      }),
      buttonError5xx: new Button({
        type: 'link',
        page: 'error5xx',
        selector: 'nav-item',
        label: '5xx',
      }),
    });
  }

  render(): string {
    return `
        <nav class="navigation-component">
            {{{ buttonLogin }}}
            {{{ buttonSignup }}}
            {{{ buttonChatboard }}}
            {{{ buttonProfile }}}
            {{{ buttonProfileDetailsEdit }}}
            {{{ buttonProfilePasswordEdit }}}
            {{{ buttonError4xx }}}
            {{{ buttonError5xx }}}
        </nav>
    `;
  }
}
