import './error-item-component.scss';
import { Block, Props } from '../../core';
import ErrorItemTemplate from './error-item-component.hbs?raw';

type ErrorItemProps = Props & {
  title?: string;
  subtitle?: string;
};

export class ErrorItem extends Block {
  constructor(props: ErrorItemProps) {
    super({
      ...props,
      title: props.title,
      subtitle: props.subtitle,
    });
  }

  render(): string {
    return ErrorItemTemplate;
  }
}
