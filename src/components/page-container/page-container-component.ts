import './page-container-component.scss';
import Block, { Props } from '../../core/Block';
import Navigation from '../navigation/navigation-component';
import PageContainerTemplate from './page-container-component.hbs?raw';

export enum PageContainerClassNameEnum {
  centered = 'centered',
}

type PageContainerProps = Props & {
  className?: string;
};

export default class PageContainer extends Block {
  constructor(props: PageContainerProps) {
    super({ ...props, navigation: new Navigation({}), component: props.component });
  }

  render(): string {
    return PageContainerTemplate;
  }
}
