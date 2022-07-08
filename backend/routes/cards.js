const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardParamsValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkRegex),
  }),
}), createCard);

router.delete('/:cardId', cardParamsValidation, removeCard);
router.put('/:cardId/likes', cardParamsValidation, likeCard);
router.delete('/:cardId/likes', cardParamsValidation, dislikeCard);

module.exports = router;
