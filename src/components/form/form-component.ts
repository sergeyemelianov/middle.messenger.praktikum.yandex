import './form-component.scss';
import Block, { Props } from '../../core/Block';
import FormTemplate from './form-component.hbs?raw';
import {formIsValid, validate} from '../../shared/utils/validation.util';
import {navigate, pagesList} from "../../index";

type FormProps = Props & {
  form?: Block;
};

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
    this.setProps({
      events: {
        submit: (event: SubmitEvent) => {
          const formData: Record<string, string> = {};
          event?.preventDefault();
          const formInputList = this.children.form.lists.inputList;
          formInputList.forEach((list: Block) => {
            const val = ((list as Block).getContent()?.querySelector('.input') as HTMLInputElement)
              ?.value;
            formData[list.props?.name as string] = val;
            const validation = validate(list.props?.name, val);
            list.setProps({
                  error: validation || '',
                  value: val,
            })
          });

          if (formIsValid(formInputList)) {
            console.log('formData ===>', formData);
            navigate(pagesList.chatboard);
          }
        },
      },
    });
  }

  render(): string {
    return FormTemplate;
  }
}
