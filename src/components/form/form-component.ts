import './form-component.scss';
import { Block, Props } from '../../core';
import FormTemplate from './form-component.hbs?raw';
import { formIsValid, validate } from '../../shared/utils/validation.util';
import { pagesListNav, router } from '../../index';

type FormProps = Props & {
  form?: Block;
};

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
    const formInputList = this.children.form.lists.inputList;
    const formData: Record<string, string> = {};

    this.setProps({
      events: {
        submit: (event: SubmitEvent) => {
          event?.preventDefault();
          formInputList.forEach((list: Block) => {
            const val = ((list as Block).getContent()?.querySelector('.input') as HTMLInputElement)
              ?.value;
            formData[list.props?.name as string] = val;
            this.setValidationError(list, val);
          });

          if (formIsValid(formInputList)) {
            console.log('formData ===>', formData);
            router.go(pagesListNav.chatboard);
          }
        },
      },
    });
  }

  setValidationError(list: Block, val: string): void {
    const validation = validate(list.props?.name, val);
    list.setProps({
      error: validation || '',
      value: val,
    });
  }

  render(): string {
    return FormTemplate;
  }
}
