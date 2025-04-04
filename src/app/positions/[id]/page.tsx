"use client"

import { useParams } from "next/navigation";

import React, { useState } from "react";

import PositionNotFound from "../not-found";
import Link from "next/link";
import { useQuery } from "react-query";
import { Job } from "@/lib/types";
import { useRouter } from "next/navigation";
import { frontEndApplicationSchema } from "@/lib/validation/applicationSchema";
import { ValidationError } from "yup";
import { handleResponse } from "@/utils/handleResponse";
import getCookie from "@/utils/getCookie";

export default function JobApplication() {
    const params = useParams();
    const { data: jobData, isLoading, isError } = useQuery(
        ["jobs", params.id],
        async () => {
            console.log(`fetching from: ${process.env.NEXT_PUBLIC_API_URL}`);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${params.id}`);
            return (await handleResponse(response));
    });
    
    const [activeTab, setActiveTab] = useState("overview");

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    if (jobData !== undefined) {
        return (
        
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-body">
        {/* Back to All Roles Button */}
        <GoBack/>
        {/* Job Role Title */}
        <section className="text-center mb-8 flex flex-col items-center justify-center">
            <div className="font-header md:text-[48px] text-[32px] font-bold">{jobData.title}</div>
            <div className="text-sm sm:text-base lg:text-xl bg-gray-200 text-gray-600 rounded-full mt-4 px-16 py-2 w-fit shadow-lg">
              {jobData.department.department_name}  |  {jobData.semester}  |  {jobData.positionsAvailable}{" Positions Avaliable"} 
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
        </div>
    );
    } else {
        return (<PositionNotFound/>);
    }
    
}

function Overview(jobData: Job) {
  return (
  <div>
    <div className="max-w-lg mx-auto mb-8 p-4 bg-blue-100 rounded">
        <h3 className=" text-black text-base lg:font-header lg:text-xl">What you will do</h3>
        <div className="text-gray-700 text-base lg:text-xl">{jobData.description}</div>
    </div>
    <div className="max-w-lg mx-auto mb-8 p-4 bg-blue-100 rounded">
        <h3 className=" text-black text-base lg:font-header lg:text-xl">Who we are looking for</h3>
        <div className="text-gray-700 text-base lg:text-xl">{jobData.requirements}</div>
    </div>
  </div>
  )
}

function Application(jobData: Job) {
  const [fullName, setFullName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reason, setReason] = useState("");
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newApplication = {
      job_id: jobData.job_id,
      status: "submitted", // Default status for new applications, change if needed
      name: fullName,
      telegram: telegramHandle,
      phone: phoneNumber,
      year: yearOfStudy ? Number(yearOfStudy) : 1,
      major: major,
      faculty: faculty,
      linkedin_url: linkedinUrl,
      resume_url: resumeLink,
      applicant_desc: reason,
    };

    try {
      // Validate input first
      await frontEndApplicationSchema.validate(newApplication, { abortEarly: false });

      // Send application to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify(newApplication),
      });

      const data = await handleResponse(response);
      console.log("Application created:", data);
      // Handle successful application creation (navigate to confirmation page)
      router.push(`/confirmation?jobTitle=${jobData.title}&department=${jobData.department.department_name}&semester=${jobData.semester}`);
    } catch (error) {
      // Handle validation error
      if (error instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((e) => {
          if (e.path) {
            validationErrors[e.path] = e.message;
          }
        });
        setErrors(validationErrors);
      }
    console.error("Error creating application:", error);
  }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto font-body md:text-xl text-base">
      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Full Name</label>
        <input
          type="text"
          placeholder="e.g. Shawn Tan"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Faculty</label>
        <input
          type="text"
          placeholder="e.g. SoC"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {errors.faculty && <p className="text-red-600 text-sm">{errors.faculty}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Major</label>
        <input
          type="text"
          placeholder="e.g. CS"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {errors.major && <p className="text-red-600 text-sm">{errors.major}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Year of Study</label>
        <select
          value={yearOfStudy}
          onChange={(e) => setYearOfStudy(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option selected value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>
        {errors.year && <p className="text-red-600 text-sm">{errors.year}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Telegram Handle</label>
        <input
          type="text"
          placeholder="e.g. @shawn_tan"
          value={telegramHandle}
          onChange={(e) => setTelegramHandle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {errors.telegram && <p className="text-red-600 text-sm">{errors.telegram}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Phone Number</label>
        <input
          type="text"
          placeholder="e.g. 23703847"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Linkedin URL</label>
        <input
          type="text"
          placeholder="Type here"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.linkedin_url && <p className="text-red-600 text-sm">{errors.linkedin_url}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Resume link</label>
        <input
          type="text"
          placeholder="Type here"
          value={resumeLink}
          onChange={(e) => setResumeLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {errors.resume_url && <p className="text-red-600 text-sm">{errors.resume_url}</p>}
      </div>

      <div className="mb-4">
        <label className="font-body lg:font-header block mb-2">Why do you want to join NFS as {jobData.title}?</label>
        <input
          type="text"
          placeholder="Type here"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {errors.applicant_desc && <p className="text-red-600 text-sm">{errors.applicant_desc}</p>}
      </div>

      <div className="w-full font-body lg:font-header flex items-center justify-center">
        <button type="submit" className="bg-button-orange text-white rounded-full px-10 py-2">
          Submit
        </button>
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