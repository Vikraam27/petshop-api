const Joi = require('joi');

const ImageHeadersModels = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
}).unknown();

const AddProductModels = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
  price: Joi.number().required(),
});

const OrderProduct = Joi.object({
  quantity: Joi.number().required(),
});

module.exports = { ImageHeadersModels, AddProductModels, OrderProduct };
