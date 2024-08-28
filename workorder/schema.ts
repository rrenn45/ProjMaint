import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  jobFunction: text('jobFunction').notNull(),
  email: text('email').notNull().unique(),
  title: text('title').notNull(),
});

export const workOrderTable = pgTable('work_order_table',{
  id: serial('id').primaryKey(),
  brief_description: text('brief_description').notNull(),
  work_order_type: text('work_order_type').notNull(),
  work_category: text('work_category').notNull(),
  priority_category: text('priority_category').notNull(),
  created_by: integer('created_by').notNull().references(() => usersTable.id,),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt:timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  asset_id: integer('asset_id').notNull().references(() => assetTable.id)
});

export const assetTable = pgTable('asset_table',{
  id: serial('id').primaryKey(),
  asset_description: text('asset_description').notNull(),
  asset_class: text('asset_class').notNull(),
  asset_criticality: integer('asset_criticality').notNull(),
  location_id: integer('location_id').notNull().references(() => locationsTable.id),

})

export const locationsTable = pgTable('location_table',{
  id:serial('id').primaryKey(),
  district: text('district').notNull(),
  field: text('field').notNull(),
  area:text('area').notNull(),
})


export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertWorkOrder = typeof workOrderTable.$inferInsert;
export type SelectWorkOrder = typeof workOrderTable.$inferSelect;

export type InsertAsset = typeof assetTable.$inferInsert;
export type SelectAsset = typeof assetTable.$inferSelect;

