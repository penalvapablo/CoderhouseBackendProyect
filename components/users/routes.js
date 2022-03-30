import { Router } from 'express';
// import passport from 'passport';
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
    res.redirect('products');
  }
  res.render('login');
});

userRouter.get('/profile', authToken, usersController.getUser);

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

// userRouter.get('/unauthorized', usersController.unauthorized);

// userRouter.post(
//   '/login',
//   passport.authenticate('local', {
//     failureRedirect: '/login-error',
//     successRedirect: '/',
//   })
// );

// PROBANDO EL FRONTEND
// userRouter.post('/login', passport.authenticate('local'), (req, res) => {
//   res.json({ message: 'usuario logueado' });
// });

/**
 * -------------- GET ROUTES ----------------
 */

// userRouter.get('/signup', isNotAuth, (req, res) => {
//   res.render('signup');
// });

// userRouter.get('/login', isNotAuth, (req, res) => {
//   res.render('login');
// });

// userRouter.get('/profile', isAuth, (req, res) => {
//   const user = req.user;
//   res.render('profile', { user });
// });

// userRouter.get('/login-error', isNotAuth, (req, res) => {
//   res.render('login-error');
// });

// userRouter.get('/logout', (req, res, next) => {
//   req.logout();
//   res.render('logout');
// });

export default userRouter;
