'use server'

import { neon } from "@neondatabase/serverless"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { randomUUID } from "crypto"
import { db } from "@/db"
import { InsertUser, usersTable } from "@/schema"

type asset = string

export async function createUser(data: InsertUser) {
    await db.insert(usersTable).values(data);
  }

export async function rawUserData(formData: FormData){
    //console.log(formData)
    const user = {name: formData.get('userName') as string, jobFunction: formData.get('jobFunction') as string, email: formData.get('emailAddress') as string}
    const user2 = {name:'rob', jobFunction: "tech", email: "rob@rob.com"}    
    await createUser(user)
}  

export async function createWorkOrder(formData: FormData){
    //console.log(formData)
    const id = randomUUID()
    const sql = neon(process.env.DATABASE_URL as string)
    const description = formData.get("description")
    const priority = formData.get("priority")
    const asset = formData.get("asset")
    const date = formData.get("date")
    await sql(`INSERT INTO workorders (id,description, priority, asset, date) VALUES ($1, $2, $3, $4, $5)`, [id, description, priority, asset, date])

    revalidatePath('/work_orders')
    redirect('/work_orders')

}

export async function createAsset(formData: FormData){
    const sql = neon(process.env.DATABASE_URL as string)
    const name = formData.get("name")
    const location = formData.get("location")
    const category = formData.get("class")

    await sql(`INSERT INTO assets (name, location, class) VALUES ($1, $2, $3)`, [name, location, category])

    revalidatePath('/assets')
    redirect('/assets')

}