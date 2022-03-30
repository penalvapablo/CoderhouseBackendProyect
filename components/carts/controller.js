import { ObjectId } from 'mongodb';
import Products from '../products/model.js';
import User from '../users/model.js';

class cartsCrontroller {
  async getCart(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const userCart = await user.cart;
      const cartArr = await Promise.all(
        userCart.map(async (element) => {
          return {
            product: await Products.findById(element.product),
            quantity: element.quantity,
            id: element._id,
          };
        })
      );
      res.status(200).json(cartArr);
    } catch (error) {
      console.log(`Error al obtener carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }

  async updateCart(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const { quantity } = req.body;
      const itemInCartId = req.params.id;
      const userCart = await user.cart;
      const itemInCart = await userCart.find(
        (x) => x.product.toString() === itemInCartId
      );
      const itemInCartIndex = await userCart.indexOf(itemInCart);
      if (quantity === 0) {
        userCart.splice(itemInCartIndex, 1);
        await user.save();
        res.status(200).json(userCart);
      }
      userCart[itemInCartIndex].quantity = quantity;

      await user.save();
      res.status(200).json(userCart);
    } catch (error) {
      console.log(`Error al actualizar producto del carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }

  async emptyCart(req, res) {
    try {
      const user = await User.findById(req.user._id);
      let userCart = await user.cart;
      userCart.splice(0, userCart.length);
      await user.save();
      console.log(user.cart);
      res.status(200).json({ message: 'carrito vaciado' });
    } catch (error) {
      console.log(`Error al vaciar el carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }
}

export default new cartsCrontroller();
