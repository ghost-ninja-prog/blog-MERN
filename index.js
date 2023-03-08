import express from 'express';
import mongoose from 'mongoose';

import { checkAuth } from './utils/index.js';

import * as UserController from './controllers/UserController.js';
import { loginValidation, registerValidation } from './validations.js';

mongoose
  .connect('mongodb+srv://alex19892140:0FcdmOeHM2ql9BKo@cluster0.gko4myi.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());


app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
