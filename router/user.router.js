const router = require('express').Router();

const {userMiddleware, oauthMiddleware} = require('../middleware');
const {userController} = require('../controller');

router.get(
    '/',
    oauthMiddleware.checkToken('accessToken'),
    userController.getAllUsers,
);
router.post(
    '/',
    userMiddleware.isNewUserBodyValid,
    userMiddleware.isUserExistsByEmail,
    userController.register,
);

router.get(
    '/:userId',
    oauthMiddleware.checkToken('accessToken'),
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExistsById,
    userController.getUserById,
);
router.put(
    '/:userId',
    oauthMiddleware.checkToken('accessToken'),
    userMiddleware.isUpdatingUserBodyValid,
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExistsById,
    userController.updateUserById,
);
router.delete(
    '/:userId',
    oauthMiddleware.checkToken('accessToken'),
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExistsById,
    userController.deleteUserById,
);

module.exports = router;