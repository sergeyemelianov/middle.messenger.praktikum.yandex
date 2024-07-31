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
import { PageListNav } from './shared/types/PageListNav';
import { getUserService } from './api-services/user-service';

export const pagesListNav: PageListNav = {
  login: '/',
  signup: '/signup',
  profileDetails: '/settings',
  profileDetailsEdit: '/settings-edit',
  profilePasswordEdit: '/settings-password-edit',
  error5xx: '/error500',
  error4xx: '/error400',
  chatboard: '/messenger',
};

export const router = new Router('app');

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(pagesListNav.login, PageContainer, {
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

  try {
    const user  = await getUserService();
    router.start();
    if (user) {
      switch (window.location.pathname) {
        case pagesListNav.login:
        case pagesListNav.signup:
          router.go(pagesListNav.chatboard);
          break;
      }
    }
  } catch (e) {
    router.start();
    router.go(pagesListNav.login)
  }
});
