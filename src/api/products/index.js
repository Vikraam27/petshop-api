const ProductsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'products',
  version: '1.0.0',
  register: async (server, { controllers, validator, storageControllers }) => {
    const productsHandler = new ProductsHandler(controllers, validator, storageControllers);
    server.route(routes(productsHandler));
  },
};
