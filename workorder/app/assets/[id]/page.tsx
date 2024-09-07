import { assetTable } from "@/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { WorkOrderForm } from "@/app/work_orders/create/workorderForm"

export default async function AssetDetailPage({params} : { params : {id : number}}){
    const asset = await db.select().from(assetTable).where(eq(assetTable.id, params.id))
    const assetTitleLocation = `${asset[0].location_id} ${asset[0].asset_description}`
    console.log(asset)
    return (
        <div className="flex h-full w-full">
            <div className="border w-3/4 p-2">
                <p>Detail Page for {asset[0].asset_description} </p>
                <p> Asset ID = {params.id}</p>
            </div>
            <WorkOrderForm asset={assetTitleLocation} />
        </div>
    )
}