/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createType("property_type_enum", ["house", "apartment"]);

  pgm.createTable("properties", {
    id: "id",
    city: { type: "text", notNull: true },
    neighborhood: { type: "text", notNull: true },
    area: { type: "numeric", notNull: true },
    built_area: { type: "numeric", notNull: true },
    sale_price: { type: "numeric" },
    rent_price: { type: "numeric" },
    garage_spots: { type: "integer", default: 0 },
    type: { type: "property_type_enum", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
