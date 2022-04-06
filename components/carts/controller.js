import Products from '../products/model.js';
import User from '../users/model.js';
import moment from 'moment';
import cartsDao from './dao.js';

class cartsCrontroller {
  async getCart(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const cart = await cartsDao.get(user);
      if (!cart)
        return res.status(404).json({ error_description: 'cart empty' });

      const cartArr = await Promise.all(
        cart.products.map(async (element) => {
          return {
            product: await Products.findById(element.productId),
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

  async addProductsToCart(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const { productId, quantity } = req.body;
      const date = moment(new Date()).format('DD/MM/YY HH:mm');
      //check if cart already exists
      const cart = await cartsDao.get(user);
      // If cart exist, just add products
      if (cart) {
        //check if product is already in cart. If it exist, add the quantity
        let productAlreadyInCart, indexOfProductAlreadyInCart;

        cart.products.forEach((product) => {
          if (product.productId === productId) {
            productAlreadyInCart = product;
          }
        });
        if (productAlreadyInCart) {
          indexOfProductAlreadyInCart =
            cart.products.indexOf(productAlreadyInCart);
          const newQuantity = productAlreadyInCart.quantity + quantity;
          cart.date = date;
          cart.products[indexOfProductAlreadyInCart].quantity = newQuantity;
          await cartsDao.update(cart._id, cart);
          return res.status(200).json({ message: 'added to cart', cart });
        }

        cart.products.push({ productId, quantity });
        cart.date = date;
        await cart.save();
        return res.status(200).json({ message: 'added to cart', cart });
      }

      // If it doesn't exist, create new cart
      const cartData = {
        userEmail: user.email,
        products: [{ productId, quantity }],
        date,
      };
      const newCart = await cartsDao.create(cartData);
      res.status(200).json({ message: 'added to cart', newCart });
    } catch (error) {
      console.log(`Error al obtener carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }

  async updateCart(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const date = moment(new Date()).format('DD/MM/YY HH:mm');
      const productId = req.params.id;
      const { quantity } = req.body;

      const cart = await cartsDao.get(user);
      let isProductInCart;
      cart.products.forEach((product) => {
        if (product.productId === productId) isProductInCart = product;
      });
      if (!isProductInCart) {
        return res
          .status(400)
          .json({ error_description: 'product is not in cart' });
      }
      const indexOfProductToUpdate = cart.products.indexOf(isProductInCart);
      const newQuantity = quantity;
      cart.date = date;
      cart.products[indexOfProductToUpdate].quantity = newQuantity;
      await cartsDao.update(cart._id, cart);

      res.status(200).json({ message: 'item in cart updated', cart });
    } catch (error) {
      console.log(`Error al actualizar producto del carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }

  async deleteCart(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const cart = await cartsDao.get(user);
      await cartsDao.delete(cart._id);
      res.status(200).json({ message: 'cart deleted' });
    } catch (error) {
      console.log(`Error al vaciar el carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }
}

export default new cartsCrontroller();
