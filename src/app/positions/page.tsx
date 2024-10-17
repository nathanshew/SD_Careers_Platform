"use client";

import { useState } from "react";
import Image from "next/image";

export default function JobApplication() {
  const [activeTab, setActiveTab] = useState("overview");

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
            <a href="/" className="mr-4">Home</a>
            <a href="/search-roles" className="mr-4">Search Roles</a>
            <a href="/apply" className="mr-4">Apply</a>
            <a href="/about-us">About Us</a>
          </nav>
        </div>
        <div>Welcome Back Shawn!</div>
      </header>

      {/* Job Role Title */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold">UI/UX Designer</h1>
        <p className="text-lg">Software Development - Semester 1</p>
        <p className="text-lg">1-5 Positions Available</p>
      </section>

      {/* Overview and Application Tabs */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 border-b-2 ${activeTab === "overview" ? "border-orange-500 text-orange-500" : "border-transparent hover:border-gray-300"}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${activeTab === "application" ? "border-orange-500 text-orange-500" : "border-transparent hover:border-gray-300"}`}
          onClick={() => setActiveTab("application")}
        >
          Application
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "overview" ? (
        <div className="max-w-lg mx-auto mb-8 p-4 bg-blue-100 rounded">
          <h2 className="text-xl font-bold">What you will do</h2>
          <p className="text-gray-700">Role Description</p>
        </div>
      ) : (
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Full Name</label>
            <input type="text" placeholder="e.g. Shawn Tan" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Faculty / Major</label>
            <input type="text" placeholder="e.g. SoC / CS" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Year of Study</label>
            <input type="text" placeholder="e.g. Year 1" className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </form>
      )}

      {/* Back to All Roles Button */}
      <div className="text-right mt-8">
        <button className="px-4 py-2 bg-gray-200 rounded">Back to all roles</button>
      </div>
    </div>
  );
}