class UserHandler {
  constructor(controllers, validator) {
    this._validator = validator;
    this._controllers = controllers;

    this.registerUserHandler = this.registerUserHandler.bind(this);
    this.getProfileHandler = this.getProfileHandler.bind(this);
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

  async getProfileHandler(request) {
    const { id } = request.auth.credentials;
    const data = await this._controllers.getUserProfile(id);

    return {
      status: 'success',
      message: 'successfully get user information',
      data: {
        userId: data.id,
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        isAdmin: data.is_admin,
      },
    };
  }
}

module.exports = UserHandler;
