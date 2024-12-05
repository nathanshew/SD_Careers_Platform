"use client";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer"
import Link from "next/link";
import { JobData, JobDataType } from "@/lib/positions/job-data";
import { useState } from "react";
import Image from "next/image";
import excoPic from "@/app/components/landing_page/Fintech_Exco.png";

// Landing page
export default function JobApplication() {
  const availableRoutes = Object.keys(JobData); // you can check from @/lib/positions/job-data.tsx
  const MIN_ROLE_PER_PAGE = 3;
  const maxRole = availableRoutes.length;
  const [rolePerPage, setRolePerPage] = useState(MIN_ROLE_PER_PAGE);
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredRoutes = availableRoutes.filter((jobPosition) => {
    if (selectedDepartment === "All") return true;
    return JobData[jobPosition].department === selectedDepartment;
  });

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar/>

      {/* Exco Picture and Join Us */}
      <div className="font-bold text-center">
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src={excoPic}
            alt="Exco Picture"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <h1 className="text-4xl text-white font-bold font-header">Join Us</h1>
          </div>
        </div>
      </div>

      {/* Open Roles */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-2xl font-bold">Open roles</div>
        <div>
        <select id="department-filter" value={selectedDepartment} onChange={handleDepartmentChange} className="px-2 py-1 border rounded bg-gray-200 text-s">
            <option value="All">Filter by Department</option>
            <option value="Software Development">Software Development</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
      </div>
      {/*This is not the actual implementation. It's just some random placeholder*/}
      <div>
        {
          filteredRoutes.slice(0, rolePerPage).map((jobPosition) => (
            <JobCard key={jobPosition} route={jobPosition} />
          ))
        }
      </div>

      {/*see more button*/}
      {(rolePerPage < maxRole) && <div className="text-left text-white mt-8">
        <button 
          className="px-4 py-2 bg-button-orange rounded" 
          onClick={() => rolePerPage < maxRole && setRolePerPage(rolePerPage + MIN_ROLE_PER_PAGE)}
        >
          See more
        </button>
      </div>}

      {/*see less button*/}
      {(rolePerPage >= maxRole) && <div className="text-left text-white mt-8">
        <button 
          className="px-4 py-2 bg-button-orange rounded" 
          onClick={() => setRolePerPage(MIN_ROLE_PER_PAGE)}
        >
          Show less
        </button>
      </div>}
      <Footer/>
    </div>
  );
}

function JobCard(props: JobCardProps) {
  const route = props.route;
  const jobData: JobDataType = JobData[route];
  const position = 0; // FIX:  replace this value
  return (
    <div key={route} className="bg-[#012665] text-white rounded-md px-3 py-3 my-2">
      <Link href = {`/positions/${route}`}>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center ml-[5%]">
          <div className="text-2xl font-bold mb-1">{jobData.title}</div>
          <div className="text-s">
            {jobData.department} <span className="mx-2">•</span> {jobData.semester}
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-4xl font-bold mb-1 mr-2 pr-4">{position}</div>
          <div className="text-base">
            <span className="text-xs block">Position</span>
            <span className="text-xs block">Available</span>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

interface JobCardProps {
  route: string;
}