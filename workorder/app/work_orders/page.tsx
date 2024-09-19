import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import WorkOrderSearch from "./work_order_ui/search";
  import { eq, like, ilike, or, asc, desc } from "drizzle-orm";
  

  import Link from "next/link"
  import { neon } from "@neondatabase/serverless";
  import { revalidatePath } from "next/cache";
  import { db } from "@/db";
import { assetTable, workOrderTable } from "@/schema";

async function getData(query:string) {
    
  const response = await db.select().from(workOrderTable).innerJoin(assetTable, eq(assetTable.id, workOrderTable.asset_id)).where(or(ilike(workOrderTable.brief_description, `%%${query}%%`), ilike(workOrderTable.work_order_type, `%%${query}%%`))).orderBy(desc(workOrderTable.createdAt));
  
  return response
}
  

export default async function WorkOrderPage({searchParams}: {searchParams?:{query?: string}}){
  const query = searchParams?.query || ' ';

  const data = await getData(query)   
    //console.log(data)
    const rows = data.map((item) => <TableRow key={item.work_order_table.id}>
    <TableCell className="font-medium"><Link href={`/work_orders/${item.work_order_table.id}`} className="hover:font-bold text-blue-600">{item.work_order_table.id}</Link></TableCell>
    <TableCell>{item.work_order_table.brief_description}</TableCell>
    <TableCell>{item.asset_table.asset_description}</TableCell>
    <TableCell>{item.work_order_table.work_order_type}</TableCell>
    <TableCell>{item.work_order_table.createdAt.toDateString()}</TableCell>
    <TableCell>{item.work_order_table.priority_category}</TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell><Link href={`/work_orders/${item.work_order_table.id}/modify`} className="hover:bg-slate-400 bg-slate-300 rounded p-2">Modify</Link></TableCell>
  </TableRow>)

    return (<div className="flex flex-col border w-full"><div className="flex justify-right border w-full items-center"><Link className="p-2 border bg-orange-200 font-bold rounded m-4" href="/work_orders/create">Create WO</Link>
    <WorkOrderSearch placeholder="Search work orders.."/>
    </div><Table>
        <TableCaption>A list of your recent work orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Work Order #</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Work Order Type</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assigned to</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {rows}
        
        </TableBody>
      </Table>
      </div>
      )
}