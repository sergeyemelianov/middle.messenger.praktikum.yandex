import './form-component.scss';
import { Block, connect, Props, State } from '../../core';
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
import {
  addUserToChatService,
  createChatsService,
  deleteUserFromChatService,
} from '../../api-services/chat-service';
import { UserResponse } from '../../shared/interfaces/UserResponse';
import { wsService } from '../../api-services/ws-service';

type FormProps = Props & {
  user?: UserResponse;
  form?: Block;
  type?: PagesEnum;
  activeChatId?: number;
};

export class Form extends Block {
  formInputList: Block[];
  type?: PagesEnum;
  activeChatId?: number;

  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          event?.preventDefault();
          this.formInputList = this.children.form.lists.inputList;
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

    if (type === PagesEnum.modalAddUser && this.activeChatId) {
      userSearchByLoginService(formData).then((response) => {
        if (!response) {
          return;
        }
        addUserToChatService(response, this.activeChatId);
      });
    }

    if (type === PagesEnum.modalDeleteUser && this.activeChatId) {
      userSearchByLoginService(formData).then((response) => {
        if (!response) {
          return;
        }

        deleteUserFromChatService(response, this.activeChatId);
      });
    }

    if (type === PagesEnum.chatMessage) {
      wsService.sendWsMessage(formData.message);
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
    if (oldProps.activeChatId !== newProps.activeChatId) {
      this.activeChatId = newProps.activeChatId;
      this.formInputList = this.children.form.lists.inputList;
    }

    return true;
  }
}

export const form = connect(Form, (state: State) => ({
  activeChatId: state?.activeChatId,
}));
