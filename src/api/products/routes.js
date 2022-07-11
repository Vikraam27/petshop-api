const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload',
    handler: handler.uploadPictureHandler,
    options: {
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
  {
    method: 'DELETE',
    path: '/product/{productId}',
    handler: handler.deleteProductHandler,
    options: {
      auth: 'petshop_jwt',
    },
  },
  {
    method: 'GET',
    path: '/product/{productId}',
    handler: handler.getProductByIdHanlder,
  },
  {
    method: 'POST',
    path: '/order/{productId}',
    handler: handler.postOrderHandler,
    options: {
      auth: 'petshop_jwt',
    },
  },
  {
    method: 'GET',
    path: '/orders',
    handler: handler.getAllOrdersHanlder,
    options: {
      auth: 'petshop_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/order/{orderId}',
    handler: handler.putOrderCompleteHandler,
    options: {
      auth: 'petshop_jwt',
    },
  },
];

module.exports = routes;
