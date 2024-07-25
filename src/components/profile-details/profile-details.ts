import './profile-details.scss';
import { Block, Props } from '../../core';
import Input from '../input/input-component';
import ProfileTemplate from './profile-details.hbs?raw';
import Button from '../button/button-component';
import { pagesListNav, router } from '../../index';
import { logoutService } from '../../api-services/logout-service';
import { UserResponse } from '../../shared/interfaces/UserResponse';
import Avatar from '../avatar/avatar-component';

type ProfileDetailsProps = Props & {
  user?: UserResponse;
};

const inputState = {
  type: 'text',
  showDivider: true,
  readonly: true,
};

export class ProfileDetails extends Block {
  constructor(props: ProfileDetailsProps) {
    super({
      ...props,
      avatar: new Avatar({
        avatar: props.user?.avatar ?? '',
        size: 'big',
        name: 'avatar',
      }),
      name: props.user?.first_name,
      buttonProfileDetailsEdit: new Button({
        view: 'link',
        page: 'profile_details_edit',
        label: 'Change details',
        events: {
          click: () => {
            router.go(pagesListNav.profileDetailsEdit);
          },
        },
      }),
      buttonProfilePasswordEdit: new Button({
        view: 'link',
        page: 'profile_password_edit',
        label: 'Change password',
        events: {
          click: () => {
            router.go(pagesListNav.profilePasswordEdit);
          },
        },
      }),
      buttonQuit: new Button({
        view: 'link',
        page: 'login',
        selector: 'danger',
        label: 'Quit',
        events: {
          click: () => {
            logoutService();
          },
        },
      }),
      inputList: [
        new Input({
          ...inputState,
          type: 'text',
          label: 'Email',
          name: 'email',
          placeholder: props.user?.email,
        }),
        new Input({
          ...inputState,
          label: 'Login',
          name: 'login',
          placeholder: props.user?.login,
        }),
        new Input({
          ...inputState,
          type: 'text',
          label: 'Name',
          name: 'first_name',
          placeholder: props.user?.first_name,
        }),
        new Input({
          ...inputState,
          label: 'Second name',
          name: 'second_name',
          placeholder: props.user?.second_name,
        }),
        new Input({
          ...inputState,
          label: 'Phone number',
          name: 'phone',
          placeholder: props.user?.phone,
        }),
      ],
    });
  }

  render(): string {
    return ProfileTemplate;
  }
}
