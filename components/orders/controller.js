import Orders from './model.js';
import Products from '../products/model.js';
import User from '../users/model.js';
import ordersDao from './dao.js';
import cartsDao from '../carts/dao.js';
import moment from 'moment';
import { checkOutEMail } from '../../utils/mail.js';

class orderController {
  async checkOut(req, res) {
    try {
      const user = await User.findById(req.user._id);
      let { email, fullname } = user;
      const cart = await cartsDao.get(user);
      const { deliveryAddress } = req.body;
      const productsInCart = await Promise.all(
        cart.products.map(async (element) => {
          console.log(element);
          const product = await Products.findById(element.productId);
          return {
            product: product.name,
            description: product.description,
            price: product.price,
            quantity: element.quantity,
          };
        })
      );
      const newOrderData = {
        userName: fullname,
        products: productsInCart,
        userEmail: email,
        date: moment(new Date()).format('DD/MM/YY HH:mm'),
        state: 'Generada',
        deliveryAddress: deliveryAddress,
      };
      const newOrder = await ordersDao.create(newOrderData);
      checkOutEMail(newOrderData);
      await cartsDao.delete(cart._id);
      res.status(200).json({ message: 'orden creada', newOrder });
    } catch (error) {
      console.log(`Error al generar la orden. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await ordersDao.getAll();

      return res.status(200).json(orders);
    } catch (error) {
      console.log(`Error al buscar las órdenes. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }
}

export default new orderController();
