import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('store_id').references('id').inTable('stores')

      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.string('category').notNullable()
      table.float('price').notNullable()
      table.integer('stock').notNullable()
      table.string('image').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
