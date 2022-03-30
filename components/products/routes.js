import { Router } from 'express';
import productsController from './controller.js';
import authToken from '../../middlewares/authToken.js';

const productsRouter = new Router();

export default (app) => {
  app.use('/products', productsRouter);

  productsRouter.get('/', authToken, productsController.getProducts);

  productsRouter.get(
    '/:category',
    authToken,
    productsController.getProductsByCategory
  );

  productsRouter.get('/:id', authToken, productsController.getProduct);

  productsRouter.post('/:id', authToken, productsController.addProductToCart);

  productsRouter.post('/', authToken, productsController.createProduct);

  productsRouter.put('/:id', authToken, productsController.updateProduct);

  productsRouter.delete('/:id', authToken, productsController.deleteProduct);
};
