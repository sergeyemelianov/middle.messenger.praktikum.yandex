import Handlebars from 'handlebars';
import * as Components from './components/index';
import * as Pages from './pages/index';
import { first } from './utils/first';
import { last } from './utils/last';
import { messages } from './data-chat/messages';
import { userData } from './data-chat/user-data';

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

const pages = {
  chatboard: [Pages.Chatboard, { messages, userData }],
  login: [Pages.Login, { userData }],
  signup: [Pages.Signup],
  profile: [Pages.Profile, { userData }],
  profile_details_edit: [Pages.ProfileDetailsEdit, { userData }],
  profile_password_edit: [Pages.ProfilePasswordEdit, { userData }],
  error5xx: [Pages.Error5xx],
  error4xx: [Pages.Error4xx],
};

function navigate(page) {
  const [source, args] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('chatboard'));

document.addEventListener('click', (e) => {
  const page = e.target.getAttribute('page');

  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

Handlebars.registerHelper('lastUtil', (array) => last(array));

Handlebars.registerHelper('firstUtil', (array) => first(array));

Handlebars.registerHelper('formatTime', (timestamp) => timestamp.slice(11, 16));

Handlebars.registerHelper(
  'countUnread',
  (conversation) => conversation.filter((elem) => !elem.message.isRead).length,
);

Handlebars.registerHelper('isAuthor', (messageUserId, ownerUserId) =>
  messageUserId === ownerUserId ? 'author' : 'not-author',
);

Handlebars.registerHelper('isEdit', (value) => value === 'edit');

Handlebars.registerHelper('capitalize', (str) => str.charAt(0).toUpperCase() + str.slice(1));
