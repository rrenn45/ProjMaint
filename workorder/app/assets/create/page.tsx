
import { createAsset } from "@/app/functions/actions"
import { AssetForm } from "./assetForm"
import { db } from "@/db"
import { locationsTable } from "@/schema"
import { Suspense } from "react"
import LocationField from "@/mycomponents/locationfield"
import { SelectItem } from "@/components/ui/select"

export default async function CreateAssetPage(){
   const data = await db.select().from(locationsTable)
        
    return(
        <div>
            
            <AssetForm data={data} />
        </div>
    )
}