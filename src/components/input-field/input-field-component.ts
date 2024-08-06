import './input-field-component.scss';
import InputFieldTemplate from './input-field-component.hbs?raw';
import { Block } from '../../core';
import { InputProps } from '../input/input-component';

type InputFieldProps = InputProps & {
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: InputEvent) => void;
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
        change: (e: InputEvent) => {
          if (props.onChange) {
            props.onChange(e);
          }
        },
      },
    });
  }
  render(): string {
    return InputFieldTemplate;
  }
}
