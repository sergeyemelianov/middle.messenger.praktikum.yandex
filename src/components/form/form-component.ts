import './form-component.scss';
import { Block, Props, State } from '../../core';
import FormTemplate from './form-component.hbs?raw';
import { formIsValid, validate } from '../../shared/utils/validation.util';
import { signupService } from '../../api-services/signup-service';
import { signinService } from '../../api-services/signin-service';
import { PagesEnum } from '../../shared/enums/Pages';
import {
  changePasswordService,
  changeUserAvatarService,
  changeUserProfileService,
  userSearchByLoginService,
} from '../../api-services/user-service';
import { createChatsService } from '../../api-services/chat-service';
import { ChatsResponse } from '../../shared/interfaces/ChatsResponse';
import { UserResponse } from '../../shared/interfaces/UserResponse';

type FormProps = Props & {
  user?: UserResponse;
  form?: Block;
  type?: PagesEnum;
};

export class Form extends Block {
  formInputList: Block[];
  chats?: ChatsResponse[];
  type?: PagesEnum;

  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          event?.preventDefault();

          if (props.type === PagesEnum.profileAvatarEdit) {
            const avatarData = this.formInputList[0]
              .getContent()
              ?.querySelector('.input') as HTMLInputElement;
            if (avatarData?.files?.length) {
              const formDataPict = new FormData();
              formDataPict.append(this.formInputList[0].props.name, avatarData?.files[0]);
              changeUserAvatarService(formDataPict);
            }
          }

          this.formInputList = this.children.form.lists.inputList;
          const formData = this.getFormData();

          this.request(props.type, formData);
        },
      },
    });
    this.type = props.type;
  }

  getFormData(): Record<string, string> {
    const formData: Record<string, string> = {};
    this.formInputList.forEach((list: Block) => {
      const val = ((list as Block).getContent()?.querySelector('.input') as HTMLInputElement)
        ?.value;

      formData[list.props?.name as string] = val;
      this.setValidationError(list, val);
    });
    return formData;
  }

  request(type?: string, formData?: Record<string, string>): void {
    if (!formData) {
      return;
    }

    if (!formIsValid(this.formInputList)) {
      return;
    }

    if (type === PagesEnum.signup) {
      signupService(formData);
    }

    if (type === PagesEnum.login) {
      signinService(formData);
    }

    if (type === PagesEnum.profileDetailsEdit) {
      changeUserProfileService(formData);
    }

    if (type === PagesEnum.profilePasswordEdit) {
      changePasswordService(formData);
    }

    if (type === PagesEnum.profilePasswordEdit) {
      changePasswordService(formData);
    }

    if (type === PagesEnum.modalAddChat) {
      createChatsService(formData);
    }

    if (type === PagesEnum.modalAddUser && this.chats) {
      userSearchByLoginService(formData, this.chats[0].id);
    }
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
