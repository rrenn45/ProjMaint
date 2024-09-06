import { createWorkOrder } from "@/app/functions/actions";
import { WorkOrderForm } from "./workorderForm";

export default function CreateWO({data} : {data: string}){
    return(<div className="w-1/2">
        <WorkOrderForm data={data}/>
      </div>)
}