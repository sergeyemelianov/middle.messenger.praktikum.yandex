import './error-page.scss';
import ErrorTemplate from './error-page.hbs?raw';
import Block, { Props } from '../../core/Block';
import Button from '../../components/button/button-component';
import { ErrorItem } from '../../components';
import { navigate, pagesList } from '../../index';

type ErrorProps = Props & {};

export default class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
      buttonBack: new Button({
        type: 'link',
        page: 'chatboard',
        label: '<- Back to chat',
        events: {
          click: () => {
            navigate(pagesList.chatboard);
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
