let report = require ("../resources/lib_createReport.js")
let params = require ("../data/params_order.json")

exports.confirm = async () => {
    try {
        const btnFinish = await element(by.id(params.orderView.finish.selector));

        if (btnFinish) {
            await browser.executeScript("arguments[0].scrollIntoView();", btnFinish)
            await btnFinish.click()
            browser.sleep(3000)
            report.getScreenShot("Order successfully")
        } else {
            console.log("Can not find 'finish'.")
        }
    } catch (error) {
        console.error("Error to execute function 'confirm':", error)
    }
}