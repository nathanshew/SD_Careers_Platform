"use client";

import Carousel from "@/components/Carousel";
import { JobDataType } from "@/lib/positions/job-data";
import { ApplicationData } from "@/lib/types";
import getCookie from "@/utils/getCookie";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";

// Mock data for saved positions, saving positions functionality not implemented yet
const inputData = {
  "ui-ux-designer": {
    title: "UI/UX Designer",
    department: "Software Development",
    semester: "Semester 1",
    positionsAvailable: "1-5 Positions Available",
    description: "As a UIUX designer, you will learn from and work closely with a team of designers, engineers, and design lead to create a fit-for-purpose, convenient, and engaging user interface for applications NUS Fintech Society would build.",  
    requirements: "You love tech and love to design!"
  },
  "software-engineer": {
    title: "Software Engineer",
    department: "Software Development",
    semester: "Semester 1",
    positionsAvailable: "5-10 Positions Available",
    description: "As a software engineer, you will be involved in the entire software development lifecycle, from requirements gathering to deployment and maintenance. You will work with a team of talented engineers to build innovative solutions for NUS Fintech Society.",
    requirements: "Strong programming skills in at least one language (e.g., Python, Java, C++)",
  },
  "data-scientist": {
    title: "Data Scientist",
    department: "Data Science",
    semester: "Semester 2",
    positionsAvailable: "2-4 Positions Available",
    description: "As a data scientist, you will leverage your data analysis and machine learning skills to extract valuable insights from large datasets. You will work on projects such as fraud detection, risk assessment, and algorithmic trading.",
    requirements: "Experience with data analysis tools (e.g., Python, R, SQL) and machine learning frameworks (e.g., TensorFlow, PyTorch)",
  }
}


export default function ApplicantDashboard() {

  // fetch all applications for this applicant
  const { data: applications, isLoading, isError } = useQuery("applications", 
    async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application/my-applications`, {
        headers: {
          "Authorization": `Bearer ${getCookie('token')}`
        }
      });
      return response.json();
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  console.log(applications);


  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Carousel/>
      <div className="px-4 md:px-12 lg:px-24 pb-20">
        <PositionApplied applications={applications || []}/>
        <PositionSaved/>
      </div>
    </div>
  );
}

// PositionAppliedProps
interface PositionAppliedProps {
  applications: ApplicationData[];
}

function PositionApplied({ applications }: PositionAppliedProps) {

  return (
    <div>
      <div className="font-header font-bold text-2xl lg:text-3xl mb-6">
        Positions Applied
      </div>
      
      {applications && applications.length > 0 ? (
        applications.map((application) => (
          <PositionCardApplied 
            key={application.application_id}
            application={application}
          />
        ))
      ) : (
        <div className="text-gray-500 italic">No applications yet</div>
      )}
    </div>
  )
}

function PositionSaved() {

  return (
    <div>
    <div className="font-header font-bold text-2xl lg:text-3xl mb-6">
      Positions Saved
    </div>
    {/*TODO: Fetching from database*/}
    {Object.values(inputData).map((job, index) => {
        return (<PositionCardSaved key={index} {...job}/>)
    })}
    </div>
  )  
}

// PositionCardProps
interface PositionCardAppliedProps {
  application: ApplicationData;
}

// Position Applied Card
function PositionCardApplied({ application }: PositionCardAppliedProps) {
  const [isShowMore, setIsShowMore] = useState(false);
  
  // Map status to display text
  const statusDisplay = () => {
    switch(application.status) {
      case 'submitted': return 'Submitted ⏳';
      case 'shortlisted': return 'Shortlisted ✅';
      case 'rejected': return 'Not Selected ❌';
      default: return 'Unknown';
    }
  };
  
  return (
    <div className="shadow-xl flex flex-cols p-4 place-content-between mb-8 bg-blue-100 hover:bg-blue-200 font-body">
      <div className="w-full">
        <div className="text-left font-bold text-xl font-header">
          {application.job.title}
        </div>
        <div>{application.job.department.department_name} - {new Date(application.job.deadline).toLocaleDateString()}</div>
        {isShowMore && (
          <div className="text-gray-600 text-sm md:text-base lg:pr-16">
            {application.job.description}
            <div className="mt-2 font-semibold">Your application details:</div>
            <div>Name: {application.name}</div>
            <div>Faculty: {application.faculty}</div>
            <div>Major: {application.major}</div>
            <div>Year: {application.year}</div>
            <div>Telegram: {application.telegram}</div>
            <div>Motivation for joining: {application.applicant_desc}</div>
          </div>
        )}
      </div>
      <div className="min-w-36 w-fit h-auto flex flex-col text-right place-content-between">
        <div className="font-bold">{statusDisplay()}</div>
        <div className="align-bottom text-sm">
          {isShowMore ? (
            <button onClick={() => setIsShowMore(false)}>
              Collapse ▲
            </button>
          ) : (
            <button onClick={() => setIsShowMore(true)}>
              View more details ▼
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PositionCardSaved(JobData: JobDataType) {
    
    return (
    <div className="shadow-xl grid grid-cols-2 p-4 h-full place-content-between mb-8 bg-blue-100 hover:bg-blue-200">
        <div className="">
          <div className="text-left font-bold text-xl font-header">
            {JobData.title}
          </div>
          <div>{JobData.department} - {JobData.semester}</div>
        </div>
        <div className="text-right  content-center">
          <Link href = {`/positions`}> {/*TODO must redirect to /positions/route */}
          <button className="bg-white px-3 py-2 rounded-md">
            Apply Now
          </button>
          </Link>
        </div>
    </div>
    );
}