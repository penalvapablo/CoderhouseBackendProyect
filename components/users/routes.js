import { Router } from 'express';
import isRegistered from './utils/isRegistered.js';
import validateUserData from './utils/validateUserData.js';
import usersController from './controller.js';
import authToken from '../../middlewares/authToken.js';

const userRouter = new Router();

userRouter.get('/signUp', (req, res) => {
  res.render('signup');
});

userRouter.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('products');
  }
  res.render('login');
});

userRouter.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('login');
});

userRouter.post(
  '/signup',
  isRegistered,
  validateUserData,
  usersController.signUp
);

userRouter.post('/login', usersController.login);

export default userRouter;
