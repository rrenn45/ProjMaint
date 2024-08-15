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
  import { neon } from "@neondatabase/serverless";
  import { revalidatePath } from "next/cache";

  async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM assets`;
    revalidatePath("/assets")
    return response
  }

export default async function AssetPage(){

    const data = await getData()   
    //console.log(data)
    const rows = data.map((item) => <TableRow key={item.id}>
    <TableCell className="font-medium"><Link href="/" className="hover:font-bold text-blue-600">{item.name}</Link></TableCell>
    <TableCell>{item.location}</TableCell>
    <TableCell>{item.class}</TableCell>
  </TableRow>)

    return(<div className="flex flex-col border w-full"><div className="flex justify-right border w-full"><Link className="p-2 border bg-orange-200 font-bold rounded m-4" href="/assets/create">Create Asset</Link></div><Table>
        <TableCaption>A list of your assets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Asset Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Asset Class</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {rows}
        
        </TableBody>
      </Table>
      </div>)
}