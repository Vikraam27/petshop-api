class AuthenticationsHandler {
  constructor(authenticationsControllers, userControllers, tokenManager, validator) {
    this._authenticationsControllers = authenticationsControllers;
    this._userControllers = userControllers;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationsPayload(request.payload);
    const { username, password } = request.payload;
    const {
      id, username: userName, isAdmin,
    } = await this._userControllers.verifyUserCredential(username, password);
    const accessToken = this._tokenManager.generateAccessToken({ id, username: userName, isAdmin });
    const refreshToken = this._tokenManager.generateRefreshToken({
      id, username: userName, isAdmin,
    });

    await this._authenticationsControllers.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      statusCode: 201,
      message: 'successfully login',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    this._validator.validatePutAuthenticationsPayload(request.payload);

    const { refreshToken } = request.payload;

    await this._authenticationsControllers.verifyRefreshToken(refreshToken);

    const { id, username, isAdmin } = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this._tokenManager.generateAccessToken({ id, username, isAdmin });

    return {
      status: 'success',
      statusCode: 200,
      message: 'successfully update the token',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    this._validator.validateDeleteAuthenticationsPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._authenticationsControllers.verifyRefreshToken(refreshToken);
    await this._authenticationsControllers.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      statusCode: 200,
      message: 'successfully deleted refresh token',
    };
  }
}

module.exports = AuthenticationsHandler;
