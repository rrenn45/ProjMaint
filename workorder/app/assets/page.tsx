import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import Link from "next/link"
  import { eq } from "drizzle-orm";
  import { neon } from "@neondatabase/serverless";
  import { revalidatePath } from "next/cache";
  import { db } from "@/db";
import { assetTable, locationsTable } from "@/schema";

  async function getData() {
    
    const response = await db.select().from(assetTable).innerJoin(locationsTable, eq(assetTable.location_id, locationsTable.id));
    revalidatePath("/assets")
    return response
  }

export default async function AssetPage(){

    const data = await getData()   
    console.log(data)
    const rows = data.map((item) => <TableRow key={item.asset_table.id}>
    <TableCell className="font-medium"><Link href="/" className="hover:font-bold text-blue-600">{item.asset_table.asset_description}</Link></TableCell>
    <TableCell>{item.location_table.field}</TableCell>
    <TableCell>{item.asset_table.asset_class}</TableCell>
    <TableCell>{item.asset_table.asset_criticality}</TableCell>
  </TableRow>)

    return(<div className="flex flex-col border w-full"><div className="flex justify-right border w-full"><Link className="p-2 border bg-orange-200 font-bold rounded m-4" href="/assets/create">Create Asset</Link></div><Table>
        <TableCaption>A list of your assets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Asset Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Asset Class</TableHead>
            <TableHead>Asset Criticality</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {rows}
        
        </TableBody>
      </Table>
      </div>)
}