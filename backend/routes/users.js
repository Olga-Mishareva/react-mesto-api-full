const router = require('express').Router();
const { userProfileValidation, userAvatarValidation } = require('../utils/validation');
const {
  getMe,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', userProfileValidation, updateUserInfo);

router.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = router;
