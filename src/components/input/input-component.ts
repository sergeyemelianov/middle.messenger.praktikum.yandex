import './input-component.scss';
import { Block, Props } from '../../core';
import InputTemplate from './input-component.hbs?raw';
import { validate } from '../../shared/utils/validation.util';
import { InputField } from '../input-field/input-field-component';
import { ValidateSourceType } from '../../shared/types/ValidateSourceType';

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
  img?: string;
  size?: 'small' | 'medium' | 'big';
  showDivider?: boolean;
  page?: string;
  error?: string;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: InputEvent) => void;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      inputField: new InputField({
        selector: props.selector,
        type: props.type,
        name: props.name,
        value: props.value,
        placeholder: props.placeholder,
        img: props.img,
        size: props.size,
        readonly: props.readonly,
        autofocus: props.autofocus,
        accept: props.accept,
        onBlur: (e) => {
          e.preventDefault();
          const val = (e.target as HTMLInputElement)?.value;
          const validation = validate(props.name, val);

          this.setProps({
            error: validation || '',
            value: props.value,
          });
        },
      }),
    });
  }

  render(): string {
    return InputTemplate;
  }
}
