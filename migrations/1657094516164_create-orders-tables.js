exports.up = (pgm) => {
  pgm.createTable('orders', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    product_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'products(id)',
      onDelete: 'CASCADE',
    },
    product_name: {
      type: 'VARCHAR(150)',
      notNull: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users(username)',
      onDelete: 'CASCADE',
    },
    price: {
      type: 'INTEGER',
      notNull: true,
    },
    quantity: {
      type: 'INTEGER',
      notNull: true,
    },
    is_completed: {
      type: 'BOOL',
      notNull: true,
      default: false,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('orders');
};
