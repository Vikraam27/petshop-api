const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');

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
      text: 'SELECT * FROM products',
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }
}

module.exports = ProductsControllers;
