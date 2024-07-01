import './profile-details.scss';
import Block, { Props } from '../../core/Block';
import Input from '../input/input-component';
import ProfileTemplate from './profile-details.hbs?raw';
import { UserInterface } from '../../shared/interfaces/user-interface';
import Button from '../button/button-component';
import { navigate, pagesList } from '../../index';

type ProfileDetailsProps = Props & {
  userData?: UserInterface;
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
      inputList: [
        new Input({
          ...inputState,
          type: 'text',
          label: 'Email',
          name: 'email',
          placeholder: props.userData?.email,
        }),
        new Input({
          ...inputState,
          label: 'Login',
          name: 'login',
          placeholder: props.userData?.login,
        }),
        new Input({
          ...inputState,
          type: 'text',
          label: 'Name',
          name: 'first_name',
          placeholder: props.userData?.first_name,
        }),
        new Input({
          ...inputState,
          label: 'Second name',
          name: 'second_name',
          placeholder: props.userData?.second_name,
        }),
        new Input({
          ...inputState,
          label: 'Phone number',
          name: 'phone',
          placeholder: props.userData?.phone,
        }),
      ],
      buttonProfileDetailsEdit: new Button({
        view: 'link',
        page: 'profile_details_edit',
        label: 'Change details',
        events: {
          click: () => {
            navigate(pagesList.profileDetailsEdit);
          },
        },
      }),
      buttonProfilePasswordEdit: new Button({
        view: 'link',
        page: 'profile_password_edit',
        label: 'Change password',
        events: {
          click: () => {
            navigate(pagesList.profilePasswordEdit);
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
            navigate(pagesList.login);
          },
        },
      }),
    });
  }

  render(): string {
    return ProfileTemplate;
  }
}
