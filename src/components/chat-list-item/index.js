import './chat-list-item.scss';
import { last } from '../../utils/last.js';
import Handlebars from "handlebars";

Handlebars.registerHelper('lastMessage', function (messages) {
    return last(messages);
});

Handlebars.registerHelper('formatTime', function (timestamp) {
    return timestamp.slice(11, 16);
});

Handlebars.registerHelper('countUnread', function (conversation) {
    return conversation.filter((elem) => !elem.message.isRead).length;
});


export {default as ChatListItem} from './chat-list-item.hbs?raw';