const {
  LoginUserPayload, RegisterUserPayload,
} = require('./models');
const InvariantError = require('../../exceptions/InvariantError');

const UserValidator = {
  validateUserRegisterModel: (payload) => {
    const validationResult = RegisterUserPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateUserLogin: (payload) => {
    const validationResult = LoginUserPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

};

module.exports = UserValidator;
