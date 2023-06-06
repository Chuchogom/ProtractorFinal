let utils = require('../resources/lib_utils.js');
let indexator = utils.getIndex(0);
let date_ = utils.getIndex(1);

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4723/wd/hub',
  specs: ['../scripts/spec.js'],
  automationName: 'UiAutomator1',
  capabilities: {
    browserName: 'chrome',
    platformName: 'Android',
    deviceName: 'ef9728f7',
    chromeOptions:{
      w3c: false
    }
  },

  params:{
    index: indexator,
    cellPhoneCapabilities:'Xiaomi MI 9',
    functionality: 'Login Saucedemo Page',
    Navigator: 'chrome',
    browserVersion: '113.10.5216',
    date_: date_,
    purpose: 'Validate login process in Saucedemo page',
    status: 'passed',
    description: "All Acceptance Criteria were validated successfully",
    testCaseName: 'ATC_0010_FUN_Login Succesful'
  }
}

