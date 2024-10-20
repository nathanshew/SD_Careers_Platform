"use client"

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer"
import PositionNotFound from "../not-found";
import { JobDataType, JobData } from "@/lib/positions/job-data";
import Link from "next/link";


export default function JobApplication() {
    const params = useParams();
    const jobData: JobDataType = JobData[params.id];
    
    const [activeTab, setActiveTab] = useState("overview");

    if (jobData !== undefined) {
        return (
        
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <NavBar/>
        {/* Job Role Title */}
        <section className="text-center mb-8">
            <h1 className="text-4xl font-bold">{jobData.title}</h1>
            <p className="text-lg">{jobData.department} - {jobData.semester}</p>
            <p className="text-lg">{jobData.positionsAvailable}</p>
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
            <Overview {...jobData}/>
        ) : (
            <Application {...jobData}/>
        )}

        {/* Back to All Roles Button */}
        <GoBack/>
        <Footer/>
        </div>
    );
    } else {
        return (<PositionNotFound/>);
    }
    
}

function Overview(jobData: JobDataType) {
  return (
  <div>
    <div className="max-w-lg mx-auto mb-8 p-4 bg-blue-100 rounded">
        <h2 className="text-xl font-bold text-black">What you will do</h2>
        <p className="text-gray-700">{jobData.description}</p>
    </div>
    <div className="max-w-lg mx-auto mb-8 p-4 bg-blue-100 rounded">
        <h2 className="text-xl font-bold text-black">Who we are looking for</h2>
        <p className="text-gray-700">{jobData.requirements}</p>
    </div>
  </div>
  )
}

function Application(jobData: JobDataType) {
  return (
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
          <div className="mb-4">
            <label className="block mb-2">Linkedin URL</label>
            <input type="text" placeholder="Type here" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Resume link</label>
            <input type="text" placeholder="Type here" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Why do you want to join NFS as {jobData.title}?</label>
            <input type="text" placeholder="Type here" className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </form>
  )
}

function GoBack() {
  return (
    <div className="text-right text-black mt-8">
      <button className="px-4 py-2 bg-gray-200 rounded">
        <Link href = {`/positions/`}>Back to all roles</Link>
      </button>
    </div>
  )
}