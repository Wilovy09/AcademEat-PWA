import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('owner_id').references('id').inTable('users').unique()
      table.string('name', 254).unique()
      table.string('description')
      table.string('category').unique()
      table.string('portrait_image')
      table.string('store_image')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
