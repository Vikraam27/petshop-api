const { Pool } = require('pg');
const { hash, compare } = require('bcrypt');
const { nanoid } = require('nanoid');

const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const NotFoundError = require('../exceptions/NotFoundError');

class UserControllers {
  constructor() {
    this._pool = new Pool();
  }

  async registerUser({
    email, username, fullname, password,
  }) {
    const userId = `user-${nanoid(10)}`;
    const hashPassword = await hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [userId, email, username, fullname, hashPassword],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw InvariantError('Fail to register user');
    }
    return result.rows[0].id;
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, username, is_admin, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('Invalid username');
    }

    const {
      id, username: userName, password: hashedPassword, is_admin: isAdmin,
    } = result.rows[0];

    const match = await compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Invalid password');
    }

    return {
      id, username: userName, isAdmin,
    };
  }

  async verifyUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('username already taken');
    }
  }

  async verifyEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('email already taken');
    }
  }

  async getUserProfile(userId) {
    const query = {
      text: 'SELECT id, email, username, fullname, is_admin FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('user not found');
    }

    return result.rows[0];
  }
}

module.exports = UserControllers;
