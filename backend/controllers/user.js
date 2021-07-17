const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { DEV_SECRET } = require('../utils/constants');

const { JWT_SECRET = DEV_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const BadError = require('../errors/bad-error');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadError('С запросом что-то не так'));
    }

    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      email,
      password: hashedPassword,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    };

    const createdUser = (
      await User.create([userData], {
        runValidators: true,
      })
    )[0];

    // я без понятия почему create игнорит select: false в модели, поэтом утак
    // eslint-disable-next-line no-underscore-dangle
    delete createdUser._doc.password;

    res.status(201).send(createdUser);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('При создании пользователя что-то пошло не так'));
    }

    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    }

    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const user = {
    ...req.body,
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      { ...user },
      { new: true, runValidators: true },
    );

    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    }
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      { avatar },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      },
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    }

    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
        // eslint-disable-next-line comma-dangle
      }
    );

    res
      .cookie('authToken', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .send({
        message: 'Авторизация успешна',
      });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findOne({ _id });

    if (!user) {
      throw new NotFoundError('Не найдено');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
};
