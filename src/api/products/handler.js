const AuthorizationError = require('../../exceptions/AuthorizationError');

class UploadsHandler {
  constructor(controllers, validator, storageControllers) {
    this._controllers = controllers;
    this._validator = validator;
    this._storageControllers = storageControllers;

    this.uploadPictureHandler = this.uploadPictureHandler.bind(this);
    this.addProductHandler = this.addProductHandler.bind(this);
    this.getAllProductsHandler = this.getAllProductsHandler.bind(this);
  }

  async uploadPictureHandler(request) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);

    const fileUrl = await this._storageControllers.uploadProfilePhoto(data);

    return {
      status: 'success',
      message: 'successfully upload image',
      data: {
        fileUrl,
      },
    };
  }

  async addProductHandler(request, h) {
    const { isAdmin } = request.auth.credentials;
    if (isAdmin) {
      this._validator.validateAddProducts(request.payload);
      const {
        name, category, description, imageUrl, price,
      } = request.payload;

      const { id } = await this._controllers
        .addProduct(name, category, description, imageUrl, price);

      return h.response({
        status: 'success',
        message: 'successfully add product',
        data: {
          productId: id,
        },
      }).code(201);
    }

    throw new AuthorizationError('you dont have authorization for this resource');
  }

  async getAllProductsHandler() {
    const data = await this._controllers.getAllProducts();

    return {
      status: 'success',
      data,
    };
  }
}

module.exports = UploadsHandler;
