import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import { Links } from "@/mycomponents/navLinks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZ Maint",
  description: "Simplifying Work Order Generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      elements: {
        formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm',
      },
    }}>
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
        <div className="flex justify-around items-center w-full border p-4 justify-items-center content-center">
          {/*<Link href="/" className="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
</svg><span className="font-bold mx-2">EZ Maint</span>
</Link>
          <Link href='/work_orders' className="hover:text-blue-700 m-2 p-4">Work Orders</Link>
          <Link href="/assets" className="hover:text-blue-700">Assets</Link>
          <Link href="/users" className="hover:text-blue-700">Users</Link> */}
          <Links/>
        <SignedOut>
            <SignInButton><button className="bg-blue-500 text-white py-2 px-4 rounded">Sign in</button></SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm',
              },
            }} />
          </SignedIn> 
        </div>
        {children}
        </div>
        </body>
    </html>
    </ClerkProvider>
  );
}
