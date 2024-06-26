import LoginPage from './pages/login/login-page';
import SignupPage from "./pages/signup/signup-page";

const signupPage = new SignupPage({});
const loginPage = new LoginPage({});
const container = document.getElementById('app')!;
// container.append(loginPage.getContent()!);
container.append(signupPage.getContent()!);
