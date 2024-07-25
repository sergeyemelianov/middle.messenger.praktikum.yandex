import './form-component.scss';
import { Block, Props, State } from '../../core';
import FormTemplate from './form-component.hbs?raw';
import { formIsValid, validate } from '../../shared/utils/validation.util';
import { signupService } from '../../api-services/signup-service';
import { signinService } from '../../api-services/signin-service';
import { PagesEnum } from '../../shared/enums/Pages';
import {
  changePasswordService,
  changeUserProfileService,
  userSearchByLoginService,
} from '../../api-services/user-service';
import { createChatsService } from '../../api-services/chat-service';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';

type FormProps = Props & {
  form?: Block;
  type?: PagesEnum;
};

export class Form extends Block {
  formInputList: Block[];
  chats?: ChatsResponse[];

  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          console.log('props', props);
          event?.preventDefault();
          console.log('----->', this.formInputList);
          this.formInputList.forEach((list: Block) => {
            const val = ((list as Block).getContent()?.querySelector('.input') as HTMLInputElement)
              ?.value;
            formData[list.props?.name as string] = val;
            this.setValidationError(list, val);
          });

          if (formIsValid(this.formInputList)) {
            console.log('formData ===>', formData);

            if (props.type === PagesEnum.signup) {
              signupService(formData);
            }

            if (props.type === PagesEnum.login) {
              signinService(formData);
            }

            if (props.type === PagesEnum.profileDetailsEdit) {
              changeUserProfileService(formData);
            }

            if (props.type === PagesEnum.profilePasswordEdit) {
              changePasswordService(formData);
            }

            if (props.type === PagesEnum.profilePasswordEdit) {
              changePasswordService(formData);
            }

            if (props.type === PagesEnum.modalAddChat) {
              createChatsService(formData);
            }

            if (props.type === PagesEnum.modalAddUser && this.chats) {
              userSearchByLoginService(formData, this.chats[0].id);
            }
          }
        },
      },
    });

    this.formInputList = this.children.form.lists.inputList;
    const formData: Record<string, string> = {};
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

  override componentDidUpdate(oldProps: State, newProps: State): boolean {
    if (oldProps.user !== newProps.user) {
      this.formInputList = this.children.form.lists.inputList;
    }

    if (oldProps.chats !== newProps.chats) {
      this.chats = newProps.chats;
    }
    return true;
  }
}
