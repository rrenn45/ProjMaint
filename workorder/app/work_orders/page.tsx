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
  

  import Link from "next/link"
  import { neon } from "@neondatabase/serverless";
  import { revalidatePath } from "next/cache";
  import { db } from "@/db";
import { workOrderTable } from "@/schema";

  async function getData() {
    
    const response = await db.select().from(workOrderTable);
    revalidatePath("/work_orders")
    return response
  }
  

export default async function WorkOrderPage(){
    const data = await getData()   
    //console.log(data)
    const rows = data.map((item) => <TableRow key={item.id}>
    <TableCell className="font-medium"><Link href="/" className="hover:font-bold text-blue-600">{item.id}</Link></TableCell>
    <TableCell>{item.brief_description}</TableCell>
    <TableCell>{item.work_order_type}</TableCell>
    <TableCell>{item.createdAt.toDateString()}</TableCell>
    <TableCell>{item.priority_category}</TableCell>
    <TableCell className="text-right">{item.asset_id}</TableCell>
    <TableCell><Link href={`/work_orders/${item.id}/modify`} className="hover:bg-slate-400 bg-slate-300 rounded p-2">Modify</Link></TableCell>
  </TableRow>)

    return (<div className="flex flex-col border w-full"><div className="flex justify-right border w-full items-center"><Link className="p-2 border bg-orange-200 font-bold rounded m-4" href="/work_orders/create">Create WO</Link>
    <WorkOrderSearch className="w-full"/>
    </div><Table>
        <TableCaption>A list of your recent work orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Work Order</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Work Order Type</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Asset</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {rows}
        
        </TableBody>
      </Table>
      </div>
      )
}