import PageContainer, {
  PageContainerClassNameEnum,
} from './components/page-container/page-container-component';
import { LoginPage, ProfileDetailsPage, SignupPage } from './pages';
import Block from './core/Block';

export const pagesList: Record<string, Block> = {
  login: LoginPage,
  signup: SignupPage,
  profileDetails: ProfileDetailsPage,
};

export const navigate = (page: Block): void => {
  const pageContainer: Block = new PageContainer({
    component: page,
    className: PageContainerClassNameEnum.centered,
  });

  const container: HTMLElement = document.getElementById('app')!;
  container.innerHTML = '';
  container.append(pageContainer.getContent()!);
};

window.addEventListener('DOMContentLoaded', () => navigate(pagesList.login));
