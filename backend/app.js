require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFoundError');
const { createUser, login, logout } = require('./controllers/users');
const { emailRegex, linkRegex, allowedCors } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkRegex),
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);

app.post('/signout', auth, logout);

app.use((req, res, next) => {
  next(new NotFoundError('Путь не найден.'));
});

app.use(errorLogger);

app.use(errors({ message: 'Переданы некорректные данные.' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT);
