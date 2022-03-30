import { Router } from 'express';
import cartsController from './controller.js';
import authToken from '../../middlewares/authToken.js';

const cartRouter = new Router();

export default (app) => {
  app.use('/cart', cartRouter);

  cartRouter.get('/', authToken, cartsController.getCart);

  cartRouter.put('/:id', authToken, cartsController.updateCart);

  cartRouter.delete('/', authToken, cartsController.emptyCart);
};
