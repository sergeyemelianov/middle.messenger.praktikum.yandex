import './profile-page.scss';
import { Block, connect, Props } from '../../core';
import ProfileDialogTemplate from './profile-page.hbs?raw';
import { profileDetails, profileDetailsEdit, profilePasswordEdit } from '../../components';
import Button from '../../components/button/button-component';
import { pagesListNav, router } from '../../index';
import { Form } from '../../components/form/form-component';
import { PagesEnum } from '../../shared/enums/Pages';
import { UserResponse } from '../../shared/interfaces/UserResponse';

type ProfileProps = Props & {
  user?: UserResponse;
};

export class Profile extends Block {
  constructor(props: ProfileProps) {
    super({
      ...props,
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

const form = connect(Form);

export const ProfileDetailsPage = new Profile({
  component: new form({ form: new profileDetails({}) }),
});

export const ProfileDetailsEditPage = new Profile({
  component: new form({ form: new profileDetailsEdit({}), type: PagesEnum.profileDetailsEdit }),
});

export const ProfilePasswordEditPage = new Profile({
  component: new form({ form: new profilePasswordEdit({}), type: PagesEnum.profilePasswordEdit }),
});
