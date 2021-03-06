exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(150)',
      notNull: true,
    },
    category: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    image_url: {
      type: 'TEXT',
      notNull: true,
    },
    price: {
      type: 'INTEGER',
      notNull: true,
    },
    is_delete: {
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
  pgm.dropTable('products');
};
