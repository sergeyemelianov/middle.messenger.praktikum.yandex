import './auth.scss';
import Handlebars from "handlebars";

Handlebars.registerHelper('isSignup', (value) => {
    return value === 'signup';
});

Handlebars.registerHelper('isLogin', (value) => {
    return value === 'login';
});

Handlebars.registerHelper('capitalize', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

export { default as Auth } from './auth.hbs?raw';