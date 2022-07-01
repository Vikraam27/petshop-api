class UserHandler {
  constructor(controllers, validator) {
    this._validator = validator;
    this._controllers = controllers;

    this.registerUserHandler = this.registerUserHandler.bind(this);
  }

  async registerUserHandler(request, h) {
    await this._validator.validateUserRegisterModel(request.payload);

    const {
      username, fullname, email, password,
    } = request.payload;
    await this._controllers.verifyEmail(email);
    await this._controllers.verifyUsername(username);

    const userId = await this._controllers.registerUser({
      email, username, fullname, password,
    });

    return h.response({
      status: 'success',
      message: 'successfully registered user, please log in',
      statusCode: 201,
      data: {
        userId,
      },
    }).code(201);
  }
}

module.exports = UserHandler;
