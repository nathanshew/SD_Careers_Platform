"use client";

import { useState } from "react";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer"
import Link from "next/link";
import { JobData } from "@/lib/positions/job-data";


export default function JobApplication() {
  const availableRoutes = Object.keys(JobData); // you can check from @/lib/positions/job-data.tsx
  return (
    
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar/>
      <div className="text-3xl font-bold">All positions page (Not implemented)</div>
      <div className="text-xl">Check out other routes.</div>
      {/*This is not the actual implementation. It's just some random placeholder*/}
      <div>
        {
          availableRoutes.map((route) => (
            <div key={route} className="bg-blue-200 text-black rounded-md px-3 py-3 max-w-48 my-2">
              <Link href = {`/positions/${route}`}>{route}</Link>
            </div>
          ))
        }
      </div>
      <GoBack/>
      <Footer/>
    </div>
  );
}

function GoBack() {
  return (
    <div className="text-right text-black mt-8">
      <button className="px-4 py-2 bg-gray-200 rounded">Back to all roles</button>
    </div>
  )
}