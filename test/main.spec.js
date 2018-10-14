describe('#MuiPlatform component test', function () {
    let page;

    describe('#Test Service', async () => {
        const common = require('../src/common');
        const testService = require('../src/testService');

        before(async () => {
            page = await browser.newPage();
            await page.goto('http://localhost:3000');
            await page.evaluate(common.getItemFromLocalStorage);
        });

        after(async function () {
            await page.close();
        });


        it('getMsgAfterWait() should return text', async function () {
            await page.evaluate(testService.getText); //передаём в контекст страницы функцию
            const text = await page.evaluate(() => getText('Hello world')); //вызываем из нужного контекста ранее переданную функцию
            expect(text).to.be.eql('Hello world');
        });

        it('saveToStorage() should save data to storage', async function () {
            await page.evaluate(testService.saveToStorage); //передаём в контекст страницы функцию
            await page.evaluate(() => saveToStorage('test', 'testData')); //вызываем из нужного контекста ранее переданную функцию
            const dataFromStorage = await page.evaluate(() => getItemFromLocalStorage('test'));
            expect(dataFromStorage).to.be.eql('testData');
        });

        it('removeFromStorage() should remove data from storage', async function () {
            let dataFromStorage = await page.evaluate(() => getItemFromLocalStorage('test'));
            expect(dataFromStorage).to.be.eql('testData');
            await page.evaluate(testService.removeFromStorage); //передаём в контекст страницы функцию
            await page.evaluate(() => removeFromStorage('test')); //вызываем из нужного контекста ранее переданную функцию
            dataFromStorage = await page.evaluate(() => getItemFromLocalStorage('test'));
            expect(dataFromStorage).to.be.a('null');
        });
    });
});