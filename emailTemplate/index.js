const {emailAction} = require('../config');

module.exports = {
    [emailAction.WELCOME]: {
        subject: 'Welcome',
        templateName: 'welcome'
    },
    [emailAction.FORGOT_PASSWORD]: {
        subject: 'Forgot password',
        templateName: 'forgotPassword',
    },
};
