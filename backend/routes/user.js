const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');

const validateURL = require('../utils/validateURL');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/user');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);
router.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().min(24).required().hex(),
    }),
  }),
  auth,
  getUser,
);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  auth,
  updateUser,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL).required(),
    }),
  }),
  auth,
  updateUserAvatar,
);

module.exports = router;
