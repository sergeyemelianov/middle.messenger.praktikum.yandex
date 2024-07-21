import './profile-details-edit.scss';
import { Block, Props, State } from '../../core';
import Input from '../input/input-component';
import Button from '../button/button-component';
import ProfileDetailsEditTemplate from './profile-details-edit.hbs?raw';
import { pagesListNav, router } from '../../index';
import { UserResponse } from '../../shared/interfaces/UserResponse';

type ProfileDetailsEditProps = Props & {
  user?: UserResponse;
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

  override componentDidUpdate(oldProps: State, newProps: State): boolean {
    if (oldProps.user !== newProps.user) {
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
    return true;
  }
}
