
import { createAsset } from "@/app/functions/actions"
import { AssetForm } from "./assetForm"

export default function CreateAssetPage(){
    return(
        <div>
            <AssetForm/>
            <form action={createAsset} className="flex flex-col justify-between m-4 border h-1/2">
                <input type="text" placeholder="Asset name" name="name"></input>
                <input type="text" placeholder="Asset location" name="location"></input>
                <input type="text" placeholder="Asset class" name="class"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}