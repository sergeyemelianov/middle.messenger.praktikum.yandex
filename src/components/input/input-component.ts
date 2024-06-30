import './input-component.scss';
import Block, { Props } from '../../core/Block';
import InputTemplate from './input-component.hbs?raw';
import { ValidateSourceType } from '../../shared/utils/validation.util';

export type InputProps = Props & {
  name?: ValidateSourceType;
  label?: string;
  selector?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  required?: boolean;
  showDivider?: boolean;
  page?: string;
  error?: string;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return InputTemplate;
  }
}
