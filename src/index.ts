import PageContainer, {
  PageContainerClassNameEnum,
} from './components/page-container/page-container-component';
import {
  ChatboardPage,
  LoginPage,
  ProfileDetailsEditPage,
  ProfileDetailsPage,
  ProfilePasswordEditPage,
  SignupPage,
} from './pages';
import Block from './core/Block';
import { Error4xx, Error5xx } from './pages';

export const pagesList: Record<string, Block> = {
  login: LoginPage,
  signup: SignupPage,
  profileDetails: ProfileDetailsPage,
  profileDetailsEdit: ProfileDetailsEditPage,
  profilePasswordEdit: ProfilePasswordEditPage,
  error5xx: Error5xx,
  error4xx: Error4xx,
  chatboard: ChatboardPage,
};

export const navigate = (page: Block): void => {
  const pageContainer: Block = new PageContainer({
    component: page,
    className:
      page === pagesList.login || page === pagesList.signup
        ? PageContainerClassNameEnum.centered
        : '',
  });

  const container: HTMLElement = document.getElementById('app')!;
  container.innerHTML = '';
  container.append(pageContainer.getContent()!);
};

window.addEventListener('DOMContentLoaded', () => navigate(pagesList.login));
