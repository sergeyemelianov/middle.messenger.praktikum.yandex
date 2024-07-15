import './profile-details-edit.scss';
import { Block, Props } from '../../core';
import Input from '../input/input-component';
import Button from '../button/button-component';
import ProfileDetailsEditTemplate from './profile-details-edit.hbs?raw';
import { UserInterface } from '../../shared/interfaces/user-interface';
import { pagesListNav, router } from '../../index';

type ProfileDetailsEditProps = Props & {
  userData?: UserInterface;
};

const inputState = {
  type: 'text',
  showDivider: true,
};

export class ProfileDetailsEdit extends Block {
  constructor(props: ProfileDetailsEditProps) {
    super({
      ...props,
      inputList: [
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Email',
          name: 'email',
          placeholder: props.userData?.email,
          autofocus: true,
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Login',
          name: 'login',
          placeholder: props.userData?.login,
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Name',
          name: 'first_name',
          placeholder: props.userData?.first_name,
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Second name',
          name: 'second_name',
          placeholder: props.userData?.second_name,
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Phone number',
          name: 'phone',
          placeholder: props.userData?.phone,
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
    return ProfileDetailsEditTemplate;
  }
}
