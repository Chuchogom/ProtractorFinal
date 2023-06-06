let report = require ("../resources/lib_createReport.js")
let params = require ("../data/params_login.json")

exports.login = async () => {
    const inputUser = await browser.findElement(by.id(params.homepage.inputUser.selector))
    const inputPassword = await browser.findElement(by.id(params.homepage.inputPassword.selector))
    
    await inputUser.sendKeys(params.homepage.inputUser.text)
    report.getScreenShot('User correct')
    
    await inputPassword.sendKeys(params.homepage.inputPassword.text)
    report.getScreenShot('Password correct')
    
    await browser.findElement(by.id(params.homepage.btnLogin.selector)).click()
    report.getScreenShot('Login correct')
}