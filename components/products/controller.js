import productsDao from './dao.js';

class ProductsController {
  async getProducts(req, res) {
    try {
      const products = await productsDao.getAll();
      if (products.length === 0) return res.json({ error: 'no products' });

      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const category = req.params.category;
      const products = await productsDao.getByCategory(category);
      if (products.length === 0) return res.json({ error: 'no products' });

      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async getProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await productsDao.get(id);

      if (!product)
        return res.status(400).json({ error_description: 'Product not found' });

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }
  async createProduct(req, res) {
    try {
      const product = req.body;
      const newProduct = await productsDao.create(product);

      return res
        .status(201)
        .json({ message: 'product created', product: newProduct });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }
  async updateProduct(req, res) {
    try {
      const updatedProduct = req.body;
      const id = req.params.id;
      if (await productsDao.update(id, updatedProduct)) {
        const product = {
          _id: id,
          ...updatedProduct,
        };
        return res.status(201).json({ product });
      }
      return res.status(404).json({ error_description: 'Product not found.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }
  async deleteProduct(req, res) {
    try {
      const product = await productsDao.delete(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ error_description: 'Product not found.' });
      }
      res.status(200).json({ message: 'product deleted' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async addProductToCart(req, res) {
    try {
      const productId = req.params.id;
      const { quantity } = req.body;
      const userId = req.user._id;
      productsDao.addProductToCart(productId, quantity, userId);
      res.status(200).json({ message: 'product added to cart' });
    } catch (error) {
      console.log(`Error al agregar producto carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }
}

export default new ProductsController();
