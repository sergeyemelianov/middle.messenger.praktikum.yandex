import './profile-details-edit.scss';
import { Block, connect, Props, State } from '../../core';
import Input, {InputProps} from '../input/input-component';
import Button from '../button/button-component';
import ProfileDetailsEditTemplate from './profile-details-edit.hbs?raw';
import { pagesListNav, router } from '../../index';
import Avatar from '../avatar/avatar-component';
import {Form} from "../form/form-component";
import AvatarChange from "../avatar-change/avatar-change-component";
import {PagesEnum} from "../../shared/enums/Pages";

type ProfileDetailsEditProps = Props;

const inputState = {
  type: 'text',
  showDivider: true,
};

export class ProfileDetailsEdit extends Block {
  constructor(props: ProfileDetailsEditProps) {
    super({
      ...props,
      changeAvatar: new Form({
        form: new AvatarChange({
          inputList: [
            new Input({
            type: 'file',
            name: 'avatar',
            accept: 'image/*'
          })],
          acceptButton: new Button({
            type: 'submit',
            view: 'confirmation',
            label: 'Save',
            }
          )
        }),
        type: PagesEnum.profileAvatarEdit
      }),
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

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      this.children.avatar = newProps.avatar;
    }

    if (oldProps.inputList !== newProps.inputList) {
      this.lists.inputList = newProps.inputList.map((item: InputProps) => { return item })
    }

    return true;
  }
}

export const profileDetailsEdit = connect(ProfileDetailsEdit, (state: State) => ({
    inputList: [
      new Input({
        ...inputState,
        selector: 'edit',
        label: 'Email',
        name: 'email',
        value: state.user?.email,
        autofocus: true,
      }),
      new Input({
        ...inputState,
        selector: 'edit',
        label: 'Login',
        name: 'login',
        value: state.user?.login,
      }),
      new Input({
        ...inputState,
        selector: 'edit',
        label: 'Name',
        name: 'first_name',
        value: state.user?.first_name,
      }),
      new Input({
        ...inputState,
        selector: 'edit',
        label: 'Second name',
        name: 'second_name',
        value: state.user?.second_name,
      }),
      new Input({
        ...inputState,
        selector: 'edit',
        label: 'Phone number',
        name: 'phone',
        value: state.user?.phone,
      }),
    ],
    avatar: new Avatar({
      avatar: state.user?.avatar ?? '',
      size: 'big',
      name: 'avatar',
    }),
    name: state.user?.first_name,
}));
