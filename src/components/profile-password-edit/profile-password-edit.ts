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
  avatar?: string;
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

  componentDidUpdate(
    oldProps: ProfilePasswordEditProps,
    newProps: ProfilePasswordEditProps,
  ): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      this.children.avatar = new Avatar({
        avatar: newProps.user?.avatar ?? '',
        size: 'big',
        name: 'avatar',
      });
    }
    return true;
  }
}

export const profilePasswordEdit = connect(ProfilePasswordEdit, (state: State) => ({
  name: state.user?.display_name,
}));
