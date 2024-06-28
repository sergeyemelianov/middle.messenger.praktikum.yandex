import './navigation-component.scss';
import Block, { Props } from '../../core/Block';
import Button from '../button/button-component';
import NavigationTemplate from './navigation-component.hbs?raw';
import { navigate, pagesList } from '../../index';

type NavigationProps = Props & {
  className?: string;
};

export default class Navigation extends Block {
  constructor(props: NavigationProps) {
    super({
      ...props,
      navs: [
        new Button({
          type: 'link',
          page: 'login',
          selector: 'nav-item',
          label: 'Login',
          events: {
            click: () => {
              navigate(pagesList.login);
            },
          },
        }),
        new Button({
          type: 'link',
          page: 'signup',
          selector: 'nav-item',
          label: 'Signup',
          events: {
            click: () => {
              navigate(pagesList.signup);
            },
          },
        }),
        new Button({
          type: 'link',
          page: 'chatboard',
          selector: 'nav-item',
          label: 'Chatboard',
        }),
        new Button({
          type: 'link',
          page: 'profile',
          selector: 'nav-item',
          label: 'Profile',
          events: {
            click: () => {
              navigate(pagesList.profileDetails);
            },
          },
        }),
        new Button({
          type: 'link',
          page: 'profile_details_edit',
          selector: 'nav-item',
          label: 'Edit user',
          events: {
            click: () => {
              navigate(pagesList.profileDetailsEdit);
            },
          },
        }),
        new Button({
          type: 'link',
          page: 'profile_password_edit',
          selector: 'nav-item',
          label: 'Edit password',
          events: {
            click: () => {
              navigate(pagesList.profilePasswordEdit);
            },
          },
        }),
        new Button({
          type: 'link',
          page: 'error4xx',
          selector: 'nav-item',
          label: '4xx',
          events: {
            click: () => {
              navigate(pagesList.error4xx);
            },
          },
        }),
        new Button({
          type: 'link',
          page: 'error5xx',
          selector: 'nav-item',
          label: '5xx',
          events: {
            click: () => {
              navigate(pagesList.error5xx);
            },
          },
        }),
      ],
    });
  }

  render(): string {
    return NavigationTemplate;
  }
}
