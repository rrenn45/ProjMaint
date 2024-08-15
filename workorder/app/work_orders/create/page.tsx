import { createWorkOrder } from "@/app/functions/actions";

export default function CreateWO(){
    return(<form action={createWorkOrder} className="flex flex-col justify-between m-4 border h-1/2">
        <input type="date" name="date"></input>
        <input type="text" name="description" placeholder="work order description"></input>
        <input type="text" name="asset" placeholder="asset"></input>
        <input type="number" name="priority" placeholder="priority"></input>
        <button className="border rounded p-4 font-bold" type="submit">Submit WO</button>
    </form>)
}