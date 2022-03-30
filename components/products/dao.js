import Products from './model.js';
import User from '../users/model.js';
class productsDao {
  async getAll(query = {}) {
    try {
      return await Products.find(query);
    } catch (error) {
      console.log(`error al buscar los productos en la db . ${error}`);
    }
  }

  async getByCategory(category) {
    try {
      return await Products.find({ category });
    } catch (error) {
      console.log(
        `error al buscar los productos por categoría en la db . ${error}`
      );
    }
  }

  async get(id) {
    try {
      return await Products.findById(id);
    } catch (error) {
      console.log(`error al buscar producto en la db . ${error}`);
    }
  }

  async create(product) {
    try {
      return await Products.create(product);
    } catch (error) {
      console.log(`error al crear producto en la db. ${error}`);
    }
  }

  async update(id, updatedProduct) {
    try {
      return await Products.findByIdAndUpdate(id, updatedProduct);
    } catch (error) {
      console.log(`error al actualizar producto en la db. ${error}`);
    }
  }

  async delete(id) {
    try {
      return await Products.findByIdAndDelete(id);
    } catch (error) {
      console.log(`error al borrar producto en la db . ${error}`);
    }
  }
  async addProductToCart(productId, quantity, userId) {
    const user = await User.findOne({ _id: userId });
    console.log(user);
    const productToAdd = {
      product: productId,
      quantity,
    };
    user.cart.push(productToAdd);
    user.save();
  }
}

export default new productsDao();
