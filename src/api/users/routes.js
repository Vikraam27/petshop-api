const routes = (handler) => [
  {
    method: 'POST',
    path: '/register',
    handler: handler.registerUserHandler,
  },
  {
    method: 'GET',
    path: '/profile',
    handler: handler.registerUserHandler,
    options: {
      auth: 'petshop_jwt',
    },
  },
];

module.exports = routes;
