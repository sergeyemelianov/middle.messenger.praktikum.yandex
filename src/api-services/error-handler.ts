import { pagesListNav, router } from '../index';

export const errorHandler = (error: number): void => {
  switch (error) {
    case 200:
      router.go(pagesListNav.chatboard);
      break;
    case 400:
      router.go(pagesListNav.error4xx);
      console.log('ERROR ===>', error);
      break;
    case 401:
      router.go(pagesListNav.error4xx);
      console.log('ERROR ===>', error);
      break;
    case 500:
      router.go(pagesListNav.error5xx);
      break;
    default:
      break;
  }
};
