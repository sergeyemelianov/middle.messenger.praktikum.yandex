import './profile-password-edit.scss';
import Block, { Props } from '../../core/Block';
import { UserInterface } from '../../shared/interfaces/user-interface';
import Input from '../input/input-component';
import Button from '../button/button-component';
import ProfilePasswordEditTemplate from './profile-password-edit.hbs?raw';
import { navigate, pagesList } from '../../index';

type ProfilePasswordEditProps = Props & {
  userData?: UserInterface;
};

const inputState = {
  type: 'password',
  showLabel: true,
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
          name: 'password',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'New password',
          name: 'password',
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Repeat new password',
          name: 'password',
        }),
      ],
      buttonSave: new Button({
        type: 'confirmation',
        label: 'Save',
        events: {
          click: () => {
            navigate(pagesList.profileDetails);
          },
        },
      }),
      buttonCancel: new Button({
        page: 'profile',
        type: 'confirmation',
        label: 'Cancel',
        events: {
          click: () => {
            navigate(pagesList.profileDetails);
          },
        },
      }),
    });
  }

  render(): string {
    return ProfilePasswordEditTemplate;
  }
}
