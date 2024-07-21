import './profile-details.scss';
import { Block, Props, State } from '../../core';
import Input from '../input/input-component';
import ProfileTemplate from './profile-details.hbs?raw';
import Button from '../button/button-component';
import { pagesListNav, router } from '../../index';
import { logoutService } from '../../api-services/logout-service';
import { UserResponse } from '../../shared/interfaces/UserResponse';

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
    console.log('PROPS IN ProfileDetails', props);
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

  override componentDidUpdate(oldProps: State, newProps: State): boolean {
    if (oldProps.user !== newProps.user) {
      this.lists = {
        inputList: [
          new Input({
            ...inputState,
            type: 'text',
            label: 'Email',
            name: 'email',
            placeholder: newProps.user?.email,
          }),
          new Input({
            ...inputState,
            label: 'Login',
            name: 'login',
            placeholder: newProps.user?.login,
          }),
          new Input({
            ...inputState,
            type: 'text',
            label: 'Name',
            name: 'first_name',
            placeholder: newProps.user?.first_name,
          }),
          new Input({
            ...inputState,
            label: 'Second name',
            name: 'second_name',
            placeholder: newProps.user?.second_name,
          }),
          new Input({
            ...inputState,
            label: 'Phone number',
            name: 'phone',
            placeholder: newProps.user?.phone,
          }),
        ],
      };
    }
    return true;
  }
}
