import './button-component.scss';
import Block, { Props } from '../../core/Block';
import ButtonTemplate from './button-component.hbs?raw';

type ButtonProps = Props & {
  type?: string;
  selector?: string;
  page?: string;
  label?: string;
  iconName?: string;
  iconSize?: string;
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render(): string {
    return ButtonTemplate;
  }
}
