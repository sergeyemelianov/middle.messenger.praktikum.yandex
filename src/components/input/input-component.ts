import './input-component.scss';
import Block, { Props } from '../../core/Block';
import InputTemplate from './input-component.hbs?raw';
import { ValidateSourceType } from '../../utils/validation.util';

type InputProps = Props & {
  name: ValidateSourceType;
  showLabel?: boolean;
  label?: string;
  selector: string;
  type?: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  required?: boolean;
  showDivider?: boolean;
  page?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        change: (e: InputEvent) =>
          props.onChange ? props.onChange((e.target as HTMLInputElement)?.value) : undefined,
        blur: (e: FocusEvent) =>
          props.onBlur ? props.onBlur((e.target as HTMLInputElement)?.value) : undefined,
      },
    });
  }

  render(): string {
    return InputTemplate;
  }
}
