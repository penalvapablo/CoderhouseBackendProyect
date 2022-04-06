import Orders from './model.js';

class ordersDao {
  async getAll(query = {}) {
    try {
      return await Orders.find(query);
    } catch (error) {
      console.log(`error al buscar las órdenes en la db . ${error}`);
    }
  }

  async get(user) {
    try {
      return await Orders.findOne({ userEmail: user.email });
    } catch (error) {
      console.log(`error al buscar producto en la db . ${error}`);
    }
  }

  async create(orderData) {
    try {
      return await Orders.create(orderData);
    } catch (error) {
      console.log(`error al crear producto en la db. ${error}`);
    }
  }

  async update(id, updatedProduct) {
    try {
      return await Orders.findByIdAndUpdate(id, updatedProduct);
    } catch (error) {
      console.log(`error al actualizar producto en la db. ${error}`);
    }
  }

  async delete(id) {
    try {
      return await Orders.findByIdAndDelete(id);
    } catch (error) {
      console.log(`error al borrar producto en la db . ${error}`);
    }
  }
}

export default new ordersDao();
