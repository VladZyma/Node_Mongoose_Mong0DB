const router = require('express').Router();

const {userMiddleware} = require('../middleware');
const {userController} = require('../controller');

router.get(
    '/',
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
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExistsById,
    userController.getUserById,
);
router.put(
    '/:userId',
    userMiddleware.isUpdatingUserBodyValid,
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExistsById,
    userController.updateUserById,
);
router.delete(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExistsById,
    userController.deleteUserById,
);

module.exports = router;