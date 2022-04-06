import { Router } from 'express';
import orderController from './controller.js';
import authToken from '../../middlewares/authToken.js';

const orderRouter = new Router();

orderRouter.post('/order', authToken, orderController.checkOut);

orderRouter.get('/order/', orderController.getOrders);

export default orderRouter;
