let params = require("../data/params_shop.json");
let report = require("../resources/lib_createReport");


exports.product = async () => {
    try {
        const addBackpack = await browser.findElement(by.id(params.shop.backpack.selector))
        const addLight = await browser.findElement(by.id(params.shop.light.selector))
        const addTshirt = await browser.findElement(by.id(params.shop.tshirt.selector))

        if (addBackpack) {
            await browser.executeScript("arguments[0].scrollIntoView();", addBackpack)
            await addBackpack.click()
            browser.sleep(2000)
            report.getScreenShot('Product select correctly')
        } else {
            console.log("Can not find 'add-to-cart-sauce-labs-backpack'.")
        }

        if (addLight) {
            await browser.executeScript("arguments[0].scrollIntoView();", addLight)
            await addLight.click()
            browser.sleep(2000)
            report.getScreenShot('Product select correctly')
        } else {
            console.log("Can not find 'add-to-cart-sauce-labs-bike-light'.")
        }

        if (addTshirt) {
            await browser.executeScript("arguments[0].scrollIntoView();", addTshirt)
            await addTshirt.click()
            browser.sleep(2000)
            report.getScreenShot('Product select correctly')
        } else {
            console.log("Can not find 'add-to-cart-test.allthethings()-t-shirt-(red)'.")
        }

    } catch (error) {
        console.error("Error to execute function 'product':", error)
    }

}