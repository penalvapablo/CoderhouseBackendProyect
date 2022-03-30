import Carts from './model.js';

class cartsDao {
  async getAll(query = {}) {
    try {
      return await Carts.find(query);
    } catch (error) {
      console.log(`error al buscar los productos en la db . ${error}`);
    }
  }

  async get(user) {
    try {
      return await Carts.findOne({ userEmail: user.email });
    } catch (error) {
      console.log(`error al buscar producto en la db . ${error}`);
    }
  }

  async create(cartData) {
    try {
      return await Carts.create(cartData);
    } catch (error) {
      console.log(`error al crear producto en la db. ${error}`);
    }
  }

  async update(id, updatedProduct) {
    try {
      return await Carts.findByIdAndUpdate(id, updatedProduct);
    } catch (error) {
      console.log(`error al actualizar producto en la db. ${error}`);
    }
  }

  async delete(id) {
    try {
      return await Carts.findByIdAndDelete(id);
    } catch (error) {
      console.log(`error al borrar producto en la db . ${error}`);
    }
  }
}

export default new cartsDao();
