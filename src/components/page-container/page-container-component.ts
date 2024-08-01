import './page-container-component.scss';
import { Block, Props } from '../../core';
import PageContainerTemplate from './page-container-component.hbs?raw';
import { errorItem } from '../error-item/error-item-component';

export enum PageContainerClassNameEnum {
  centered = 'centered',
}

type PageContainerProps = Props & {
  className?: string;
  component?: Block | null;
};

export default class PageContainer extends Block {
  constructor(props: PageContainerProps) {
    super({ ...props, errorItem: new errorItem({ type: 'header' }) });
  }

  render(): string {
    return PageContainerTemplate;
  }
}
