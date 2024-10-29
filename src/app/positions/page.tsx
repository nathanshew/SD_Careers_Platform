"use client";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer"
import Link from "next/link";
import { JobData, JobDataType } from "@/lib/positions/job-data";
import { useState } from "react";

// Landing page
export default function JobApplication() {
  const availableRoutes = Object.keys(JobData); // you can check from @/lib/positions/job-data.tsx
  const MIN_ROLE_PER_PAGE = 4;
  const maxRole = availableRoutes.length;
  const [rolePerPage, setRolePerPage] = useState(MIN_ROLE_PER_PAGE);
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar/>
      <div className="font-bold text-center">
        <h1 className="text-3xl">(Temporarily used)</h1>
        <p className="text-xl">NUS Fintech Society Recruitment for AY 2024/2025</p>
      </div>
      <div className="text-2xl font-bold">Open roles</div>
      {/*This is not the actual implementation. It's just some random placeholder*/}
      <div>
        {
          availableRoutes.slice(0, rolePerPage).map((jobPosition) => (
            <JobCard route={jobPosition}/>
          ))
        }
      </div>
      {/*see more / see less */}
      {(rolePerPage < maxRole) && <div className="text-left text-black mt-8">
        <button 
          className="px-4 py-2 bg-gray-200 rounded" 
          onClick={() => rolePerPage < maxRole && setRolePerPage(rolePerPage + MIN_ROLE_PER_PAGE)}
        >
          Show more
        </button>
      </div>}
      {(rolePerPage >= maxRole) && <div className="text-left text-black mt-8">
        <button 
          className="px-4 py-2 bg-gray-200 rounded" 
          onClick={() => setRolePerPage(MIN_ROLE_PER_PAGE)}
        >
          Show less
        </button>
      </div>}
      <Footer/>
    </div>
  );
}

function JobCard(props: any) {
  const route = props.route;
  const jobData: JobDataType = JobData[route];
  const position = 0; // FIX:  replace this value
  return (
    <div key={route} className="bg-blue-200 text-black rounded-md px-3 py-3 my-2">
      <Link href = {`/positions/${route}`}>
      <div className="text-xl font-bold">{jobData.title}</div>
      <div>{jobData.department} - {jobData.semester}</div>
      <div>{position} positions available</div>
      </Link>
    </div>
  )
}

function GoBack() {
  return (
    <div className="text-right text-black mt-8">
      <Link href = {`/positions`}>
      <button className="px-4 py-2 bg-gray-200 rounded">Back to all roles</button>
      </Link>
    </div>
  )
}

