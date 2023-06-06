let report = require ("../resources/lib_createReport.js")
let params = require ("../data/params_homepage.json")

exports.resolveURL = async () => {
    await browser.waitForAngularEnabled(false)
    await browser.get(params.home.url)
    await browser.sleep(4000)
    report.getScreenShot('Homepage')
}
