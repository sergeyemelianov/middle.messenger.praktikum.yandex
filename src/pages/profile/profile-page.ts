import './profile-page.scss';
import Block, { Props } from '../../core/Block';
import ProfileDialogTemplate from './profile-page.hbs?raw';
import Button from '../../components/button/button-component';
import Avatar from '../../components/avatar/avatar-component';
import { ProfileDetails } from '../../components/profile-details/profile-details';
import { userData } from '../../data-chat/user-data';

enum ProfileOptions {
  read = 'read',
  editDetails = 'editDetails',
  editPassword = 'editPassword',
}

type ProfileProps = Props & {
  type?: ProfileOptions;
};

export default class Profile extends Block {
  constructor(props: ProfileProps) {
    super({
      ...props,
      avatar: new Avatar({
        avatar: userData.avatar ?? '',
        size: 'big',
        name: 'avatar',
      }),
      name: userData.name,
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

export const ProfileDetailsPage = new Profile({
  component: new ProfileDetails({ userdata: userData }),
});
