import './navigation-component.scss';
import { Block, Props } from '../../core';
import Button from '../button/button-component';
import NavigationTemplate from './navigation-component.hbs?raw';
import { pagesListNav, router } from '../../index';

type NavigationProps = Props & {
  className?: string;
};

export default class Navigation extends Block {
  constructor(props: NavigationProps) {
    super({
      ...props,
      navs: [
        new Button({
          view: 'link',
          page: 'login',
          selector: 'nav-item',
          label: 'Login',
          events: {
            click: () => {
              router.go(pagesListNav.login);
            },
          },
        }),
        new Button({
          view: 'link',
          page: 'signup',
          selector: 'nav-item',
          label: 'Signup',
          events: {
            click: () => {
              router.go(pagesListNav.signup);
            },
          },
        }),
        new Button({
          view: 'link',
          page: 'chatboard',
          selector: 'nav-item',
          label: 'Chatboard',
          events: {
            click: () => {
              router.go(pagesListNav.chatboard);
            },
          },
        }),
        new Button({
          view: 'link',
          page: 'profile',
          selector: 'nav-item',
          label: 'Profile',
          events: {
            click: () => {
              router.go(pagesListNav.profileDetails);
            },
          },
        }),
        new Button({
          view: 'link',
          page: 'profile_details_edit',
          selector: 'nav-item',
          label: 'Edit user',
          events: {
            click: () => {
              router.go(pagesListNav.profileDetailsEdit);
            },
          },
        }),
        new Button({
          view: 'link',
          page: 'profile_password_edit',
          selector: 'nav-item',
          label: 'Edit password',
          events: {
            click: () => {
              router.go(pagesListNav.profilePasswordEdit);
            },
          },
        }),
        new Button({
          view: 'link',
          page: 'error4xx',
          selector: 'nav-item',
          label: '4xx',
          events: {
            click: () => {
              router.go(pagesListNav.error4xx);
            },
          },
        }),
        new Button({
          view: 'link',
          page: 'error5xx',
          selector: 'nav-item',
          label: '5xx',
          events: {
            click: () => {
              router.go(pagesListNav.error5xx);
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
