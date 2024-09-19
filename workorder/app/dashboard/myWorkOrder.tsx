import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default function MyWorkOrdersTable(){
    return(<Table>
        <TableCaption>A list of recent work orders you created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Work Order Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Asset</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Assigned</TableCell>
            <TableCell>OB seal leaking</TableCell>
            <TableCell className="text-right">Water Injection Pump #1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      )
}