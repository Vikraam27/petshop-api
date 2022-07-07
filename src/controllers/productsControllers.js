const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class ProductsControllers {
  constructor() {
    this._pool = new Pool();
  }

  async addProduct(name, category, description, imageUrl, price) {
    const id = `product-${nanoid(14)}`;
    const query = {
      text: 'INSERT INTO products VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, name, category, description, imageUrl, price],
    };

    const { rows, rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new InvariantError('fail to add product');
    }

    return rows[0];
  }

  async getAllProducts() {
    const query = {
      text: 'SELECT id, name, category, description, image_url, price FROM products WHERE is_delete = false',
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }

  async deleteProductById(productId) {
    const query = {
      text: 'UPDATE products SET is_delete = true WHERE id = $1',
      values: [productId],
    };

    await this._pool.query(query);
  }

  async getProductById(productId) {
    const query = {
      text: 'SELECT id, name, category, description, image_url, price FROM products WHERE is_delete = false AND id = $1',
      values: [productId],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('product not found');
    }

    return rows[0];
  }

  async addOrder(username, productId, productName, price, quantity) {
    const id = `order-${nanoid(9)}`;
    const query = {
      text: 'INSERT INTO orders VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, productId, productName, username, price, quantity],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvariantError('cant complete order please try again');
    }

    return rows[0];
  }
}

module.exports = ProductsControllers;
