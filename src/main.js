import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { first } from "./utils/first.js";
import { last } from "./utils/last.js";
import { identity } from "./utils/identity.js";
import { messages } from "./data-chat/messages.js";
import { userData } from "./data-chat/user-data.js";

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

const pages = {
    'chatboard': [ Pages.Chatboard, { messages: messages, userData: userData } ],
    'login': [ Pages.Login, { userData: userData } ],
    'signup': [ Pages.Signup ],
    'profile': [ Pages.Profile, { userData: userData } ],
    'profile-details-edit': [ Pages.ProfileDetailsEdit, { userData: userData } ],
    'profile-password-edit': [ Pages.ProfilePasswordEdit, { userData: userData } ],
    'error5xx': [ Pages.Error5xx ],
    'error4xx': [ Pages.Error4xx ],
};


document.addEventListener('DOMContentLoaded', () => navigate('chatboard'));

function navigate(page) {
    const [ source, args ] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('click', e => {
    const page = e.target.getAttribute('page');

    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

Handlebars.registerHelper('lastUtil', function (array) {
    return last(array);
});

Handlebars.registerHelper('firstUtil', function (array) {
    return first(array);
});

Handlebars.registerHelper('formatTime', function (timestamp) {
    return timestamp.slice(11, 16);
});

Handlebars.registerHelper('countUnread', function (conversation) {
    return conversation.filter((elem) => !elem.message.isRead).length;
});

Handlebars.registerHelper('isAuthor', function (messageUserId, ownerUserId) {
    return messageUserId === ownerUserId ? 'author' : 'not-author';
});

Handlebars.registerHelper('isEdit', (value) => {
    return value === 'edit';
});

Handlebars.registerHelper('capitalize', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});
