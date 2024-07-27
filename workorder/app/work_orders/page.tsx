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
  

export default function WorkOrderPage(){
    return (<Table>
        <TableCaption>A list of your recent work orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Work Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="text-right">Asset</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium"><Link href="/" className="hover:font-bold text-blue-600">W001</Link></TableCell>
            <TableCell>Assigned</TableCell>
            <TableCell>7/7/2024</TableCell>
            <TableCell className="text-right">Fuel Gas Compressor B</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      )
}