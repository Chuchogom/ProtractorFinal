let params = require("../data/params_cart.json");
let report = require("../resources/lib_createReport");

exports.cart = async () => {
    try {
        const viewCart = await browser.findElement(by.className(params.cartView.cart.selector))
        const checkout = await element(by.id(params.cartView.checkout.selector));

        if (viewCart) {
            await browser.executeScript("arguments[0].scrollIntoView();", viewCart)
            await viewCart.click()
            browser.sleep(3000)
            report.getScreenShot("Cart view successful")
        } else {
            console.log("Can not find 'shopping_cart_link'.")
        }

        if (checkout) {
            await browser.executeScript("arguments[0].scrollIntoView();", checkout)
            await checkout.click()
            browser.sleep(3000)
            report.getScreenShot("Checkout page successful")
        } else {
            console.log("Can not find 'checkout'.")
        }

    } catch (error) {
        console.error("Error in function 'cart':", error)
    }
    
}