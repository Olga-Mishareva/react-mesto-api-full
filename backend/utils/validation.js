const { celebrate, Joi, errors } = require('celebrate');
const { linkRegex, emailRegex } = require('./constants');

module.exports.registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkRegex),
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required(),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required(),
  }),
});

module.exports.userProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(linkRegex),
  }),
});

module.exports.cardParamsValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports.cardInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkRegex),
  }),
});

module.exports.joiErrors = errors({ message: 'Переданы некорректные данные.' });
