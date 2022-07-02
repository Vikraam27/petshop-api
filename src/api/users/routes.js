const routes = (handler) => [
  {
    method: 'POST',
    path: '/register',
    handler: handler.registerUserHandler,
  },
  {
    method: 'GET',
    path: '/profile',
    handler: handler.getProfileHandler,
    options: {
      auth: 'petshop_jwt',
    },
  },
];

module.exports = routes;
