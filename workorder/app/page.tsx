import Image from "next/image";

import { neon } from "@neondatabase/serverless";



export default async function Home() {
 

  return (<div className="flex flex-col justify-center items-center w-full h-full font-bold"><p className="text-xl">Welcome to EZ Maint</p> <p>Sign up or log in to create work orders easily.</p></div>
  
  );
}
