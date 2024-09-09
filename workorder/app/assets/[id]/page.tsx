import { assetTable } from "@/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { WorkOrderForm } from "@/app/work_orders/create/workorderForm"
import {auth, currentUser } from '@clerk/nextjs/server'

export default async function AssetDetailPage({params} : { params : {id : number}}){
    const {userId} = auth()
    if (userId) {}
    const user = await currentUser()
    const username = user?.emailAddresses[0].emailAddress
    const asset = await db.select().from(assetTable).where(eq(assetTable.id, params.id))
    const assetTitleLocation = `${asset[0].location_id} ${asset[0].asset_description}`
    console.log(user?.emailAddresses[0].emailAddress)
    const assetId = params.id
    const assetObj = {assetId, username}

    return (
        <div className="flex h-full w-full">
            <div className="border w-3/4 p-2">
                <p>Detail Page for {asset[0].asset_description} </p>
                <p> Asset ID = {params.id}</p>
            </div>
            <WorkOrderForm dataHeader={assetObj}/>
        </div>
    )
}