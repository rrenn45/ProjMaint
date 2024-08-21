import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZ Maint",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
        <div className="flex flex-col justify-around items-center h-full border p-4 justify-items-center content-center">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <Link href='/work_orders' className="hover:text-blue-700 m-2 p-4">Work Orders</Link>
          <Link href="/assets" className="hover:text-blue-700">Assets</Link>
          <Link href="/users" className="hover:text-blue-700">Users</Link>
        </div>
        {children}
        </div>
        </body>
    </html>
  );
}
