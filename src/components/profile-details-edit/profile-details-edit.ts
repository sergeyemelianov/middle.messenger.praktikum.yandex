import './profile-details-edit.scss';
import { Block, connect, Props, State } from '../../core';
import Input, { InputProps } from '../input/input-component';
import Button from '../button/button-component';
import ProfileDetailsEditTemplate from './profile-details-edit.hbs?raw';
import { pagesListNav, router } from '../../index';
import { Form } from '../form/form-component';
import AvatarChange from '../avatar-change/avatar-change-component';
import { PagesEnum } from '../../shared/enums/Pages';
import { UserResponse } from '../../shared/interfaces/UserResponse';

type ProfileDetailsEditProps = Props & {
  user?: UserResponse;
  name?: string;
};

const inputState = {
  type: 'text',
  showDivider: true,
};

export class ProfileDetailsEdit extends Block {
  constructor(props: ProfileDetailsEditProps) {
    super({
      ...props,
      buttonSave: new Button({
        type: 'submit',
        view: 'confirmation',
        label: 'Save',
      }),
      buttonCancel: new Button({
        view: 'confirmation',
        label: 'Cancel',
        events: {
          click: () => {
            router.go(pagesListNav.profileDetails);
          },
        },
      }),
    });
  }

  render(): string {
    return ProfileDetailsEditTemplate;
  }

  override componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.user !== newProps.user) {
      this.children.changeAvatar = new Form({
        form: new AvatarChange({
          inputList: [
            new Input({
              type: 'file',
              name: 'avatar',
              accept: 'image/*',
              size: 'big',
              img: newProps.user?.avatar || '../../assets/icons/avatar-default.svg',
            }),
          ],
          acceptButton: new Button({
            type: 'submit',
            view: 'confirmation',
            label: 'Replace avatar',
          }),
        }),
        type: PagesEnum.profileAvatarEdit,
      });

      this.lists = {
        inputList: [
          new Input({
            ...inputState,
            selector: 'edit',
            label: 'Email',
            name: 'email',
            value: newProps.user?.email,
            autofocus: true,
          }),
          new Input({
            ...inputState,
            selector: 'edit',
            label: 'Login',
            name: 'login',
            value: newProps.user?.login,
          }),
          new Input({
            ...inputState,
            selector: 'edit',
            label: 'Display name',
            name: 'display_name',
            value: newProps.user?.display_name,
          }),
          new Input({
            ...inputState,
            selector: 'edit',
            label: 'Name',
            name: 'first_name',
            value: newProps.user?.first_name,
          }),
          new Input({
            ...inputState,
            selector: 'edit',
            label: 'Second name',
            name: 'second_name',
            value: newProps.user?.second_name,
          }),
          new Input({
            ...inputState,
            selector: 'edit',
            label: 'Phone number',
            name: 'phone',
            value: newProps.user?.phone,
          }),
        ],
      };
    }

    if (oldProps.inputList !== newProps.inputList) {
      this.lists.inputList = newProps.inputList.map((item: InputProps) => {
        return item;
      });
    }

    return true;
  }
}

export const profileDetailsEdit = connect(ProfileDetailsEdit, (state: State) => ({
  user: state.user,
  name: state.user?.display_name,
}));
