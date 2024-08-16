import { usersTable } from "@/schema"
import { createUser, rawUserData } from "../functions/actions"
import { db } from "@/db"

export default async function UsersPage(){
    const result = await db.select().from(usersTable)
    console.log(result)
    return(<div className="flex flex-col justify-around">
        <header className="font-bold">Create New User</header>
        <form action={rawUserData}>
            <input type="email" name="emailAddress" placeholder="email"></input>
            <input type="text" name="jobFunction" placeholder="job function"></input>
            <input type="text" name="userName" placeholder="first and last name"></input>
            <button type="submit">Submit New User</button>
        </form>
            {result.map((item) => <p key={item.id}>Name: {item.name}  Function: {item.jobFunction}</p>)}
    </div>)
}