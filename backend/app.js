require('dotenv').config();

const { PORT = 3000 } = process.env;
const DB_CONNECTION = 'mongodb://localhost:27017/mestodb';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, Joi, celebrate } = require('celebrate');

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { login, createUser } = require('./controllers/user');

const validateURL = require('./utils/validateURL');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cookieParser());
app.use(express.json());

mongoose.connect(DB_CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      avatar: Joi.string().custom(validateURL),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser
);
app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);

app.use(() => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT);
