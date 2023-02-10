const router = require('express').Router();

const {tokenAction} = require('../config');
const {oauthMiddleware} = require('../middleware');
const {oauthController} = require('../controller');

router.post(
    '/login',
    oauthMiddleware.isLoginBodyValid,
    oauthController.login,
);
router.post(
    '/refresh',
    oauthMiddleware.checkToken('refreshToken'),
    oauthController.refresh,
);
router.post(
    '/logout',
    oauthMiddleware.checkToken('accessToken'),
    oauthController.logout,
);
router.post(
    '/logoutAll',
    oauthMiddleware.checkToken('accessToken'),
    oauthController.logoutAll,
);
router.post(
    '/password/forgot',
    oauthMiddleware.isUserEmailValid,
    oauthMiddleware.isUserExistsByEmail,
    oauthController.forgotPassword,
);
router.put(
    '/password/forgot',
    oauthMiddleware.isUserNewPasswordValid,
    oauthMiddleware.checkActionToken(tokenAction.FORGOT_PASSWORD),
    oauthController.setNewPassword,
);

module.exports = router;