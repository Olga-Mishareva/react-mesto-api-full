require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const auth = require('./middlewares/auth');

const { createUser, login, logout } = require('./controllers/users');
const { allowedCors } = require('./utils/constants');
const { limiter } = require('./utils/limiter');
const { registerValidation, loginValidation, joiErrors } = require('./utils/validation');
const { errorsHandler, notFound } = require('./utils/errorsHandler');
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

app.use(limiter);

// потом удалить
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);

app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);

app.post('/signout', auth, logout);

app.use(notFound);

app.use(errorLogger);

app.use(joiErrors);

app.use(errorsHandler);

app.listen(PORT);
