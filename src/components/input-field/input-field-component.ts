import './input-field-component.scss';
import InputFieldTemplate from './input-field-component.hbs?raw';
import Block from '../../core/Block';
import { InputProps } from '../input/input-component';

type InputFieldProps = InputProps & {
  onBlur?: (e: FocusEvent) => void;
};

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      events: {
        blur: (e: FocusEvent) => {
          if (props.onBlur) {
            props.onBlur(e);
          }
        },
      },
    });
  }
  render(): string {
    return InputFieldTemplate;
  }
}
