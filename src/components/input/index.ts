import './input-component.scss';
import Block from '../../core/Block';

import InputTemplate from './input-component.hbs?raw';

type InputProps = {
  showLabel?: boolean;
  name?: string;
  label?: string;
  selector: string;
  type?: string;
  value?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  required?: boolean;
  minL?: string;
  max?: string;
  showDivider?: boolean;
  page?: string;
  onChange: (value: string) => void;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        change: (e) => props.onChange(e.target.value),
        blur: (e) => this.validate(e.target.value),
      },
    });
  }

  render(): string {
    return InputTemplate;
  }

  validate(value: string): void {
    console.log('validate', value);
  }
}
