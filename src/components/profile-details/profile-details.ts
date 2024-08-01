import './profile-details.scss';
import { Block, connect, Props, State } from '../../core';
import Input, { InputProps } from '../input/input-component';
import ProfileTemplate from './profile-details.hbs?raw';
import Button from '../button/button-component';
import { pagesListNav, router } from '../../index';
import { logoutService } from '../../api-services/logout-service';
import Avatar from '../avatar/avatar-component';
import { UserResponse } from '../../shared/interfaces/UserResponse';

type ProfileDetailsProps = Props & {
  user?: UserResponse;
};

export const inputState = {
  type: 'text',
  showDivider: true,
  readonly: true,
};

export class ProfileDetails extends Block {
  constructor(props: ProfileDetailsProps) {
    super({
      ...props,
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
    });
  }

  render(): string {
    return ProfileTemplate;
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      this.children.avatar = newProps.avatar;
      return true;
    }

    if (oldProps.inputList !== newProps.inputList) {
      this.lists.inputList = newProps.inputList.map((item: InputProps) => {
        return item;
      });
      return true;
    }

    return false;
  }
}

export const profileDetails = connect(ProfileDetails, (state: State) => ({
  name: state.user?.first_name,
  avatar: new Avatar({
    avatar: state.user?.avatar ?? '',
    size: 'big',
    name: 'avatar',
  }),
  inputList: [
    new Input({
      ...inputState,
      type: 'text',
      label: 'Email',
      name: 'email',
      placeholder: state.user?.email,
    }),
    new Input({
      ...inputState,
      label: 'Login',
      name: 'login',
      placeholder: state.user?.login,
    }),
    new Input({
      ...inputState,
      type: 'text',
      label: 'Name',
      name: 'first_name',
      placeholder: state.user?.first_name,
    }),
    new Input({
      ...inputState,
      label: 'Second name',
      name: 'second_name',
      placeholder: state.user?.second_name,
    }),
    new Input({
      ...inputState,
      label: 'Phone number',
      name: 'phone',
      placeholder: state.user?.phone,
    }),
  ],
}));
