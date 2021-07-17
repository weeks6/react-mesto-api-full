const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createCard,
  getCards,
  deleteCard,
  removeCardLike,
  setCardLike,
} = require('../controllers/card');

const validateURL = require('../utils/validateURL');

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).required().hex(),
  }),
});

router.get('/cards', auth, getCards);
router.delete('/cards/:cardId', validateCardId, auth, deleteCard);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().custom(validateURL).required(),
    }),
  }),
  auth,
  createCard,
);

router.put('/cards/:cardId/likes', validateCardId, auth, setCardLike);
router.delete('/cards/:cardId/likes', validateCardId, auth, removeCardLike);

module.exports = router;
