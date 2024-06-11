import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { messages } from "./data-chat/messages.js";

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

const pages = {
    'chatboard': [ Pages.Chatboard, {messages: messages} ],
    'login': [ Pages.Login ],
    'signup': [ Pages.Signup ],
    'profile': [ Pages.Profile ],
    'error': [ Pages.Error ],
};


document.addEventListener('DOMContentLoaded', () => navigate('signup'));

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