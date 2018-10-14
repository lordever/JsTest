const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);
const stubServer = require('../server').app;
const port = 3000;

// puppeteer options
const opts = {
    headless: true,
    slowMo: 100,
    timeout: 10000
};

let server;
let page;

// expose variables
before(function (done) {
    server = stubServer.listen(port); //запуск сервера с моками
    global.expect = expect;

    puppeteer
        .launch(opts) //запуск браузера
        .then(function (browser) {
            global.browser = browser;
            done();
        });
});

// close browser and reset global variables
after(function () {
    browser.close(); //выключение браузера
    server.close(); //выключение сервера с моками
    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});