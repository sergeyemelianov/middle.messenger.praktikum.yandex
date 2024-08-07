import './error-page.scss';
import ErrorTemplate from './error-page.hbs?raw';
import { Block, Props } from '../../core';
import Button from '../../components/button/button-component';
import { ErrorItem } from '../../components';
import { pagesListNav, router } from '../../index';

type ErrorProps = Props;

export default class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
      buttonBack: new Button({
        view: 'link',
        page: 'chatboard',
        label: '<- Back to chat',
        events: {
          click: () => {
            router.go(pagesListNav.chatboard);
          },
        },
      }),
    });
  }

  render(): string {
    return ErrorTemplate;
  }
}

export const Error5xx = new Error({
  component: new ErrorItem({ title: '500', subtitle: 'Server error!' }),
});

export const Error4xx = new Error({
  component: new ErrorItem({ title: '400', subtitle: 'Page not found!' }),
});
