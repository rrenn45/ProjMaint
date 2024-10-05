import { ModifyWOForm } from "@/mycomponents/modifyWOform"
import { fetchWorkOrderById } from "@/lib/data"
import { EditForm } from "@/components/workorder-form"

export const dynamic = 'force-dynamic'

export default async function WorKOrderModifyPage({params}:{params: {id: number}}){
    const id = params.id 
    const workOrder = await fetchWorkOrderById(id)
    console.log(workOrder)
    return(<div className="p-2"><p>Modify work order for ID: {params.id}</p>
    <EditForm workOrder={workOrder}/>
    </div>)
}