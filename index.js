const puppeteer = require('puppeteer');

var USER = {login:"",password:""}

async function main() {     
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://sigaa.ufpi.br/sigaa/verTelaLogin.do');    

    // Fill username field    
    await page.$eval('input[name="user.login"]', (el, user) => el.value = user, USER.login);
    // Fill password field
    await page.$eval('input[name="user.senha"]', (el, user) => el.value = user, USER.password);
    // Click login and wait for loading    

    await Promise.all([
        page.click("input[type=submit]"),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);    
    
    var [button] = await page.$x("//span[contains(., 'Ensino')]");
    if (button)
        await button.click();
    
    var [button] = await page.$x("//td[contains(., 'Minhas Notas')]")
    if (button)
        await button.click();
}

main()