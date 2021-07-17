const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validation = require('validator');

const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validation.isEmail(v);
      },
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return validation.isURL(v, { require_protocol: true });
      },
      message: 'Некорректная ссылка',
    },
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    return Promise.reject(
      new UnauthorizedError('Неправильные почта или пароль'),
    );
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return Promise.reject(
      new UnauthorizedError('Неправильные почта или пароль'),
    );
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
