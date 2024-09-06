
import { createAsset } from "@/app/functions/actions"
import { AssetForm } from "./assetForm"
import { db } from "@/db"
import { locationsTable } from "@/schema"
import { Suspense } from "react"

export default async function CreateAssetPage(){
    const data = await db.select().from(locationsTable)
    return(<Suspense fallback={<p>Loading...</p>}>
        <div>
            <AssetForm data={data}/>
        </div></Suspense>
    )
}