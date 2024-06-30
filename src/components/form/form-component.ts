import './form-component.scss';
import Block, { Props } from '../../core/Block';
import FormTemplate from './form-component.hbs?raw';
import { validate } from '../../shared/utils/validation.util';

type FormProps = Props & {
  form?: Block;
};

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
    this.setProps({
      events: {
        submit: (event: SubmitEvent) => {
          event?.preventDefault();
          this.children.form.lists.inputList.forEach((list: Record<string, any>) => {
            const val = ((list as Block).getContent()?.querySelector('.input') as HTMLInputElement)
              ?.value;
            const validation = validate(list.props?.name, val);
            if (validation) {
              (list as Block).setProps({
                error: validation,
              });
            } else {
              (list as Block).setProps({
                error: '',
              });
            }
          });
        },
      },
    });
  }

  render(): string {
    return FormTemplate;
  }
}
