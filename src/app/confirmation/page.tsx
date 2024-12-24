"use client";

import checkmark from "@/app/components/confirmation/checkmark.png";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";


export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("jobTitle");
  const department = searchParams.get("department");
  const semester = searchParams.get("semester");

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Image
            src="/Fintech Logo.svg"
            alt="Fintech Society Logo"
            width={50}
            height={50}
          />
          <nav className="ml-8">
            <a href="/" className="mr-4">
              Home
            </a>
            <a href="/search-roles" className="mr-4">
              Search Roles
            </a>
            <a href="/apply" className="mr-4">
              Apply
            </a>
            <a href="/about-us">About Us</a>
          </nav>
        </div>
        <div>Welcome Back Shawn!</div>
      </header>

      {/* Job Role Title */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold">{jobTitle}</h1>
        <p className="text-lg">{department}</p>
        <p className="text-lg">{semester}</p>
      </section>

      <div className="flex items-center justify-center space-x-4 mt-8">
        <Image
          src={checkmark}
          alt="Confirmation Checkmark"
          width={80}
          height={80}
        />
        <h1 className="text-3xl">Thank you!</h1>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-8">
        <h2 className="text-xl">
          Your application is successfully submitted, we will be in touch with
          you shortly.
        </h2>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-8">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
          Return to dashboard
        </button>
      </div>
    </div>
  );
}
