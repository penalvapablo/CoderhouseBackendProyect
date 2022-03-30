import { Router } from 'express';
// import { isAuth, isNotAuth, isAdmin } from '../../utils/Auth.js';
import orderController from './controller.js';
import authToken from '../../middlewares/authToken.js';

const orderRouter = new Router();

orderRouter.post('/order', authToken, orderController.checkOut);

// orderRouter.get('/order/:id', getUserOrder)

// orderRouter.get('/order/list', getOrders)

// orderRouter.get('/orderSuccess', (req, res)=>{
//   res.render('orderSuccess')
// })

export default orderRouter;
