import './page-container-component.scss';
import { Block, Props } from '../../core';
import PageContainerTemplate from './page-container-component.hbs?raw';

export enum PageContainerClassNameEnum {
  centered = 'centered',
}

type PageContainerProps = Props & {
  className?: string;
  component?: Block | null;
};

export default class PageContainer extends Block {
  constructor(props: PageContainerProps) {
    super({ ...props, user: props.user });
  }

  render(): string {
    return PageContainerTemplate;
  }
}
