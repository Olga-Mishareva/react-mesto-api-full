const router = require('express').Router();
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardParamsValidation, cardInfoValidation } = require('../utils/validation');

router.get('/', getCards);

router.post('/', cardInfoValidation, createCard);

router.delete('/:cardId', cardParamsValidation, removeCard);
router.put('/:cardId/likes', cardParamsValidation, likeCard);
router.delete('/:cardId/likes', cardParamsValidation, dislikeCard);

module.exports = router;
