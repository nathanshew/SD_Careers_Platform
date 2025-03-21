"use client";

import Link from "next/link";
import { JobData } from "@/lib/positions/job-data";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import excoPic from "@/app/components/landing_page/Fintech_Exco.png";
import { useQuery } from "react-query";
import { Job } from "@/lib/types";
import { handleResponse } from "@/utils/handleResponse";

// Landing page
export default function JobApplication() {
  const availableRoutes = Object.keys(JobData); // you can check from @/lib/positions/job-data.tsx
  const MIN_ROLE_PER_PAGE = 3;
  const maxRole = availableRoutes.length;
  const [rolePerPage, setRolePerPage] = useState(MIN_ROLE_PER_PAGE);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isPopup, setIsPopup] = useState(false);
  const isSignIn = true; // Replace with actual sign-in status

  const { data: availableJobs, isLoading, isError } = useQuery(
    ["jobs"],
    async () => {
      console.log(`fetching from: ${process.env.NEXT_PUBLIC_API_URL}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`);
      return (await handleResponse(response));
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredJobs = availableJobs.filter((jobPosition: Job) => {
    if (selectedDepartment === "All") return true;
    return jobPosition.department.department_name === selectedDepartment;
  });

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Exco Picture and Join Us */}
      <div className="font-bold text-center">
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src={excoPic}
            alt="Exco Picture"
            width={1020}
            height={400}
            priority
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
            <option value="SD">Software Development</option>
            <option value="ML">Machine Learning</option>
            <option value="Quant">Quant</option>
          </select>
        </div>
      </div>

      {/*This is not the actual implementation. It's just some random placeholder*/}
      <div>
        {
          filteredJobs.slice(0, rolePerPage).map((jobPosition: Job) => (
            <JobCard key={jobPosition.job_id} job={jobPosition} isSignIn={isSignIn} popupHandler={setIsPopup}/>
          ))
        }
      </div>

      {/* see more button */}
      {rolePerPage < maxRole && (
        <div className="text-left text-white mt-8">
          <button
            className="px-4 py-2 bg-button-orange rounded"
            onClick={() => rolePerPage < maxRole && setRolePerPage(rolePerPage + MIN_ROLE_PER_PAGE)}
          >
            See more
          </button>
        </div>
      )}

      {/* see less button */}
      {rolePerPage >= maxRole && (
        <div className="text-left text-white mt-8">
          <button
            className="px-4 py-2 bg-button-orange rounded"
            onClick={() => setRolePerPage(MIN_ROLE_PER_PAGE)}
          >
            Show less
          </button>
        </div>
      )}

      {isPopup && <SignInModal isPopup={isPopup} popupHandler={setIsPopup} />}
    </div>
  );
}

function SignInModal(props: SignInModalProps) {
  const setIsPopup = props.popupHandler;
  return (
    <div className="fixed flex flex-col items-center text-center justify-center px-10 py-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1/5 min-w-72 h-1/2 rounded-lg shadow-2xl">
      <button className="absolute text-white font-3xl px-2.5 py-1 bg-black hover:bg-gray-300 rounded-full top-6 right-6"
        onClick={() => { setIsPopup(false) }}
      >
        &#x2716; {/* X Close Button*/}
      </button>
      <h3 className="font-header my-10 font-bold text-button-orange">
        Please sign in to apply!
      </h3>
      <Link href="/signin">
        <button className="bg-button-orange max-w-48 text-white rounded-full px-10 py-2 font-header font-bold">
          Sign in
        </button>
      </Link>
    </div>
  )
}

function JobCard(props: JobCardProps) {
  const { job, isSignIn, popupHandler } = props;
  const setIsPopup = popupHandler;
  return (
    <div key={job.job_id} className="bg-[#012665] text-white rounded-md px-3 py-3 my-2">
      {/* Handling click */}
      <Link onClick={() => { return !isSignIn && setIsPopup(true); }}
        href={isSignIn ? `/positions/${job.job_id}` : "#"} // redirect to signin page
        scroll={isSignIn} // Prevent scrolling when popup shows up
      >
        {/* content */}
        <div className="flex justify-between">
          <div className="flex flex-col justify-center ml-[5%]">
            <div className="text-2xl font-bold mb-1">{job.title}</div>
            <div className="text-s">
              {job.department.department_name} <span className="mx-2">•</span> {job.semester}
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-4xl font-bold mb-1 mr-2 pr-4">{job.positionsAvailable}</div>
            <div className="text-base">
              <span className="text-xs block">
                {job.positionsAvailable === 1 ? "Position" : "Positions"}
              </span>
              <span className="text-xs block">Available</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

interface SignInModalProps {
  isPopup: boolean;
  popupHandler: Dispatch<SetStateAction<boolean>>;
}

interface JobCardProps {
  job: Job;
  isSignIn: boolean;
  popupHandler: Dispatch<SetStateAction<boolean>>;
}

