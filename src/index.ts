import {
  ChatboardPage,
  Error4xx,
  Error5xx,
  LoginPage,
  ProfileDetailsEditPage,
  ProfileDetailsPage,
  ProfilePasswordEditPage,
  SignupPage,
} from './pages';
import { Router } from './core';
import PageContainer, {
  PageContainerClassNameEnum,
} from './components/page-container/page-container-component';
import { connect } from './core';

export const pagesListNav: Record<string, string> = {
  login: '/',
  signup: '/signup',
  profileDetails: '/profile-details',
  profileDetailsEdit: '/profile-details-edit',
  profilePasswordEdit: '/profile-password-edit',
  error5xx: '/error500',
  error4xx: '/error400',
  chatboard: '/chatboard',
};

export const router = new Router('app');

window.addEventListener('DOMContentLoaded', () =>
  router
    .use(pagesListNav.login, connect(PageContainer), {
      component: LoginPage,
      className: PageContainerClassNameEnum.centered,
    })
    .use(pagesListNav.signup, PageContainer, {
      component: SignupPage,
      className: PageContainerClassNameEnum.centered,
    })
    .use(pagesListNav.chatboard, PageContainer, { component: ChatboardPage })
    .use(pagesListNav.profileDetails, PageContainer, { component: ProfileDetailsPage })
    .use(pagesListNav.profileDetailsEdit, PageContainer, { component: ProfileDetailsEditPage })
    .use(pagesListNav.profilePasswordEdit, PageContainer, { component: ProfilePasswordEditPage })
    .use(pagesListNav.error5xx, PageContainer, { component: Error5xx })
    .use(pagesListNav.error4xx, PageContainer, { component: Error4xx })
    .start(),
);
