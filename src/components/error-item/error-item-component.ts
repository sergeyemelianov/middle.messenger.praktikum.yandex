import './error-item-component.scss';
import { Block, connect, Props, State } from '../../core';
import ErrorItemTemplate from './error-item-component.hbs?raw';

type ErrorItemProps = Props & {
  title?: string;
  subtitle?: string;
  type?: 'page' | 'header';
};

export class ErrorItem extends Block {
  constructor(props: ErrorItemProps) {
    super({
      ...props,
      title: props.title,
      subtitle: props.subtitle,
      type: props.type,
    });
  }

  render(): string {
    return ErrorItemTemplate;
  }
}

export const errorItem = connect(ErrorItem, (state: State) => ({
  title: state?.error
}));
