const router = require('express').Router();

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

module.exports = router;