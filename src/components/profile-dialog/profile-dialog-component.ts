import './profile-dialog-component.scss';
import Block, { Props } from '../../core/Block';
import ProfileDialogTemplate from './profile-dialog-component.hbs?raw';
import Button from '../button/button-component';
import Avatar from '../avatar/avatar-component';
import { UserInterface } from '../../shared/interfaces/user-interface';

type ProfileDialogProps = Props & {
  userdata?: UserInterface;
  name?: string;
  type?: string;
};

export default class ProfileDialog extends Block {
  constructor(props: ProfileDialogProps) {
    super({
      ...props,
      avatar: new Avatar({
        avatar: props.userdata ? props.userdata.avatar : '',
        size: 'big',
        name: 'avatar',
      }),
      buttonSave: new Button({
        type: 'confirmation',
        label: 'Save',
      }),
      buttonCancel: new Button({
        page: 'profile',
        type: 'confirmation',
        label: 'Cancel',
      }),
      buttonBack: new Button({
        type: 'confirmation',
        page: 'chatboard',
        label: 'Back to chatboard',
      }),
      buttonProfileDetailsEdit: new Button({
        type: 'link',
        page: 'profile_details_edit',
        label: 'Change details',
      }),
      buttonProfilePasswordEdit: new Button({
        type: 'link',
        page: 'profile_password_edit',
        label: 'Change password',
      }),
      buttonQuit: new Button({
        type: 'link',
        page: 'login',
        selector: 'danger',
        label: 'Quit',
      }),
    });
  }

  render(): string {
    return ProfileDialogTemplate;
  }
}
