import Orders from './model.js';
import Products from '../products/model.js';
import User from '../users/model.js';
import moment from 'moment';
import { checkOutEMail } from '../../utils/mail.js';

class orderController {
  async checkOut(req, res) {
    try {
      const user = await User.findById(req.user._id);
      let { cart, email, fullname } = user;
      const productsInCart = await Promise.all(
        cart.map(async (element) => {
          const product = await Products.findById(element.product);
          return {
            product: product.name,
            description: product.description,
            price: product.price,
            quantity: element.quantity,
          };
        })
      );
      const newOrder = new Orders({
        userName: fullname,
        products: productsInCart,
        userEmail: email,
        date: moment(new Date()).format('DD/MM/YY HH:mm'),
        state: 'Generada',
      });
      user.cart = [];
      checkOutEMail(newOrder);

      await user.save();
      await newOrder.save();
      res.status(200).json({ message: 'orden creada', newOrder });
    } catch (error) {
      logger.error(`Error al generar pedido. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }
}

export default new orderController();
