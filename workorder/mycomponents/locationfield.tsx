import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db } from "@/db"
import { locationsTable } from "@/schema"

export default async function LocationField(){
    const data = await db.select().from(locationsTable)
    console.log(data)
    return(<>
        {data.map((item) => <SelectItem key={item.location_id} value={item.area}>{item.field} {item.area}test</SelectItem>)}
        </>
    )
}