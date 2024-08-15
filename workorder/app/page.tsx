import Image from "next/image";

import { neon } from "@neondatabase/serverless";

async function getData(){
  const sql = neon(process.env.DATABASE_URL as string);
  const response = await sql`SELECT * FROM playing_with_neon`
  return response
}

export default async function Home() {
  const data = await getData()
  console.log(data)

  return (<div className="flex justify-center items-center w-full font-bold"><p>Homepage/Dashboard</p></div>
  
  );
}
