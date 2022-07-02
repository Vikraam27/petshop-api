const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload',
    handler: handler.uploadPictureHandler,
    options: {
      auth: 'petshop_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'POST',
    path: '/product',
    handler: handler.addProductHandler,
    options: {
      auth: 'petshop_jwt',
    },
  },
  {
    method: 'GET',
    path: '/products',
    handler: handler.getAllProductsHandler,
  },
];

module.exports = routes;
