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
        
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-body">
        <NavBar/>
        {/* Back to All Roles Button */}
        <GoBack/>
        {/* Job Role Title */}
        <section className="text-center mb-8 flex flex-col items-center justify-center">
            <div className="font-header md:text-[48px] text-[32px] font-bold">{jobData.title}</div>
            <div className="text-sm sm:text-base lg:text-xl bg-gray-200 text-gray-600 rounded-full mt-4 px-16 py-2 w-fit shadow-lg">
              {jobData.department}  |  {jobData.semester}  |  {jobData.positionsAvailable}
            </div>
        </section>

        {/* Overview and Application Tabs */}
        <div className="flex justify-center mb-10 mt-10">
            <button
            className={`font-header text-xl lg:text-2xl lg:px-48 md:px-24 px-8 border-b-2 ${activeTab === "overview" ? "border-standard-orange text-standard-orange font-semibold" : "border-transparent hover:border-gray-300"}`}
            onClick={() => setActiveTab("overview")}
            >
            Overview
            </button>
            <button
            className={`font-header text-xl lg:text-2xl lg:px-48 md:px-24 px-8 py-2 border-b-2 ${activeTab === "application" ? "border-standard-orange text-standard-orange font-semibold" : "border-transparent hover:border-gray-300"}`}
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
        <h3 className="font-header text-black">What you will do</h3>
        <div className="text-gray-700 text-xl">{jobData.description}</div>
    </div>
    <div className="max-w-lg mx-auto mb-8 p-4 bg-blue-100 rounded">
        <h3 className="font-header text-black">Who we are looking for</h3>
        <div className="text-gray-700 text-xl">{jobData.requirements}</div>
    </div>
  </div>
  )
}

function Application(jobData: JobDataType) {
  return (
     <form className="max-w-lg mx-auto font-body md:text-xl text-base">
          <div className="mb-4">
            <label className="font-header block mb-2">Full Name</label>
            <input type="text" placeholder="e.g. Shawn Tan" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="font-header block mb-2">Faculty / Major</label>
            <input type="text" placeholder="e.g. SoC / CS" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="font-header block mb-2">Year of Study</label>
            <input type="text" placeholder="e.g. Year 1" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="font-header block mb-2">Linkedin URL</label>
            <input type="text" placeholder="Type here" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="font-header block mb-2">Resume link</label>
            <input type="text" placeholder="Type here" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="font-header block mb-2">Why do you want to join NFS as {jobData.title}?</label>
            <input type="text" placeholder="Type here" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="w-full font-header flex items-center justify-center">
            <button className="bg-button-orange text-white rounded-full px-10 py-2">Submit</button>
          </div>
          
        </form>
  )
}

function GoBack() {
  return (
    <div className="text-right text-black mt-8">
      <button className="text-sm px-4 py-2 my-5 bg-blue-200 text-blue-950 rounded-full">
        <Link href = {`/positions/`}>Back to all roles</Link>
      </button>
    </div>
  )
}