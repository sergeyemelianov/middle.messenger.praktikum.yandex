import {JSDOM} from 'jsdom';

const jsdom = new JSDOM("<body></body>", {
  url: "http://localhost/3000",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.FormData = jsdom.window.FormData;
global.history = jsdom.window.history;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
