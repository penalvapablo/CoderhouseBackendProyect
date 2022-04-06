import products from '../components/products/routes.js';
import users from '../components/users/routes.js';
import carts from '../components/carts/routes.js';
import orders from '../components/orders/routes.js';
import configInfo from '../components/configInfo/index.js';
import chat from '../components/chat/routes.js';

export default (app) => {
  app.get('/', (req, res) => {
    if (req.session.user) {
      return res.redirect('products');
    }
    res.redirect('login');
  });

  app.use(users);
  products(app);
  carts(app);
  app.use(orders);
  app.use(configInfo);
  app.use(chat);

  app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
};
