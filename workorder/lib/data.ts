import { unstable_noStore as noStore } from 'next/cache';
import { neon } from "@neondatabase/serverless"
import { SelectUser, workOrderTable } from '@/schema';
import { db } from '@/db';
import {asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm'
import { PgTimestampString } from 'drizzle-orm/pg-core';


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const sql = neon(process.env.DATABASE_URL as string);

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    console.log(invoices)
    return invoices
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function getUserWorkOrders(id: SelectUser['id']): Promise<
  Array<{
    id: number;
    brief_description: string;
    work_order_type: string;
    work_category: string;
    createdAt: Date;
  
  }>
  >{
    return  db.select().from(workOrderTable).where(eq(workOrderTable.created_by, id));
  }