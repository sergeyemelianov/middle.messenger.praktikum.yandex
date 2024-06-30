import './profile-page.scss';
import Block, { Props } from '../../core/Block';
import ProfileDialogTemplate from './profile-page.hbs?raw';
import Avatar from '../../components/avatar/avatar-component';
import { userData } from '../../data-chat/user-data';
import { ProfileDetails, ProfileDetailsEdit, ProfilePasswordEdit } from '../../components';
import Button from '../../components/button/button-component';
import { navigate, pagesList } from '../../index';
import { Form } from '../../components/form/form-component';

type ProfileProps = Props & {};

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
      buttonBack: new Button({
        view: 'link',
        page: 'chatboard',
        label: '<- Back to chat',
        events: {
          click: () => {
            navigate(pagesList.chatboard);
          },
        },
      }),
    });
  }
  render(): string {
    return ProfileDialogTemplate;
  }
}

export const ProfileDetailsPage = new Profile({
  component: new Form({ form: new ProfileDetails({ userData: userData }) }),
});

export const ProfileDetailsEditPage = new Profile({
  component: new Form({ form: new ProfileDetailsEdit({ userData: userData }) }),
});

export const ProfilePasswordEditPage = new Profile({
  component: new Form({ form: new ProfilePasswordEdit({ userData: userData }) }),
});
