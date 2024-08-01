import './profile-password-edit.scss';
import { Block, connect, Props, State } from '../../core';
import Input from '../input/input-component';
import Button from '../button/button-component';
import ProfilePasswordEditTemplate from './profile-password-edit.hbs?raw';
import { pagesListNav, router } from '../../index';
import { UserResponse } from '../../shared/interfaces/UserResponse';
import Avatar from '../avatar/avatar-component';

type ProfilePasswordEditProps = Props & {
  user?: UserResponse;
};

const inputState = {
  type: 'password',
  showDivider: true,
};

export class ProfilePasswordEdit extends Block {
  constructor(props: ProfilePasswordEditProps) {
    super({
      ...props,
      inputList: [
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Old password',
          name: 'oldPassword',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'New password',
          name: 'newPassword',
        }),
      ],
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
    return ProfilePasswordEditTemplate;
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      this.children.avatar = newProps.avatar;
      return true;
    }

    return false;
  }
}

export const profilePasswordEdit = connect(ProfilePasswordEdit, (state: State) => {
  return {
    avatar: new Avatar({
      avatar: state.user?.avatar ?? '',
      size: 'big',
      name: 'avatar',
    }),
    name: state.user?.first_name,
  };
});
