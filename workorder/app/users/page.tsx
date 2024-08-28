import { usersTable } from "@/schema"
import { createUser, rawUserData } from "../functions/actions"
import { db } from "@/db"
import { getUserWorkOrders } from "@/lib/data" 

export default async function UsersPage(){
    const result = await db.select().from(usersTable)
    const orders = await getUserWorkOrders(4)
    console.log(result)
    console.log(orders)
    return(<div className="flex flex-col justify-around">
        <header className="font-bold">Create New User</header>
        <form action={rawUserData}>
            <input type="email" name="emailAddress" placeholder="email"></input>
            <input type="text" name="jobFunction" placeholder="job function"></input>
            <input type="text" name="userName" placeholder="first and last name"></input>
            <input type="text" name="title" placeholder="job title"></input>
            <button type="submit">Submit New User</button>
        </form>
            {result.map((item) => <p key={item.id}>Name: {item.name}  Function: {item.jobFunction}</p>)}
            {orders.map((item) => <p key={item.id}>Description: {item.brief_description} Category: {item.work_category} Type: {item.work_order_type} Created On: {item.createdAt.toDateString()}</p>)}
    </div>)
}