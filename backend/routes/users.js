const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMe,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');
const { linkRegex } = require('../utils/constants');

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(linkRegex),
  }),
}), updateAvatar);

module.exports = router;
