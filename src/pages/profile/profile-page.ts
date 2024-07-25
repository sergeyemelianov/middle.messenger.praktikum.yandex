import './profile-page.scss';
import { Block, connect, Props } from '../../core';
import ProfileDialogTemplate from './profile-page.hbs?raw';
import Avatar from '../../components/avatar/avatar-component';
import { ProfileDetails, ProfileDetailsEdit, ProfilePasswordEdit } from '../../components';
import Button from '../../components/button/button-component';
import { pagesListNav, router } from '../../index';
import { Form } from '../../components/form/form-component';
import { PagesEnum } from '../../shared/enums/Pages';

type ProfileProps = Props;

export class Profile extends Block {
  constructor(props: ProfileProps) {
    super({
      ...props,
      avatar: new Avatar({
        avatar: props.user?.avatar ?? '',
        size: 'big',
        name: 'avatar',
      }),
      name: props.user?.first_name,
      buttonBack: new Button({
        view: 'link',
        page: 'chatboard',
        label: '<- Back to chat',
        events: {
          click: () => {
            router.go(pagesListNav.chatboard);
          },
        },
      }),
    });
  }

  render(): string {
    return ProfileDialogTemplate;
  }
}

const profile = connect(Profile);
const profileDetails = connect(ProfileDetails);
const profileDetailsEdit = connect(ProfileDetailsEdit);
const profilePasswordEdit = connect(ProfilePasswordEdit);
const form = connect(Form);
export const ProfileDetailsPage = new profile({
  component: new form({ form: new profileDetails({})}),
});

export const ProfileDetailsEditPage = new profile({
  component: new form({ form: new profileDetailsEdit({}), type: PagesEnum.profileDetailsEdit }),
});

export const ProfilePasswordEditPage = new profile({
  component: new form({ form: new profilePasswordEdit({}), type: PagesEnum.profilePasswordEdit }),
});
