let params = require("../data/params_form.json");
let report = require("../resources/lib_createReport");

exports.form = async () => {
    try {
        const firstName = await browser.findElement(by.id(params.form.inputName.selector))
        const lastName = await browser.findElement(by.id(params.form.inputLastName.selector))
        const postalCode = await browser.findElement(by.id(params.form.inputPostalCode.selector))
        const btnContinue = await browser.findElement(by.id(params.form.btnContinue.selector))

        if (firstName) {
            await browser.executeScript("arguments[0].scrollIntoView();", firstName)
            await firstName.sendKeys(params.form.inputName.text)
            report.getScreenShot('Enter name')
        } else {
            console.log("Can not find 'first-name'.")
        }

        if (lastName) {
            await browser.executeScript("arguments[0].scrollIntoView();", lastName)
            await lastName.sendKeys(params.form.inputLastName.text)
            report.getScreenShot('Enter last name')
        } else {
            console.log("Can not find 'last-name'.")
        }

        if (postalCode) {
            await browser.executeScript("arguments[0].scrollIntoView();", postalCode)
            await postalCode.sendKeys(params.form.inputPostalCode.text)
            report.getScreenShot('Enter postal code')
            browser.sleep(3000)
        } else {
            console.log("Can not find 'postal-code'.")
        }
        await browser.executeScript("arguments[0].scrollIntoView();", btnContinue)
        await btnContinue.click()
        await btnContinue.click()
        report.getScreenShot('Correct click to view order')
        browser.sleep(3000)

        if (btnContinue) {
        } else {
            console.log("Can not find 'continue'.")
        }

    } catch (error) {
        console.error("Error in function 'form':", error)
    }
}