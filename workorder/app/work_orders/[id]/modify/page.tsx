import { ModifyWOForm } from "@/mycomponents/modifyWOform"
import { fetchWorkOrderById } from "@/lib/data"

export default async function WorKOrderModifyPage({params}:{params: {id: number}}){
    const id = params.id 
    const workOrder = await fetchWorkOrderById(id)
    return(<div className="p-2"><p>Modify work order for ID: {params.id}</p>
    <ModifyWOForm workOrder={workOrder}/>
    </div>)
}