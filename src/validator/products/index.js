const InvariantError = require('../../exceptions/InvariantError');
const { AddProductModels, ImageHeadersModels } = require('./models');

const ProductsValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = ImageHeadersModels.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateAddProducts: (payload) => {
    const validationResult = AddProductModels.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ProductsValidator;
