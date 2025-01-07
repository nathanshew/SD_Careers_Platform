"use client";

import Carousel from "@/components/Carousel";
import { JobDataType } from "@/lib/positions/job-data";
import Link from "next/link";
import React, { useState } from "react";

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
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Carousel/>
      <div className="px-4 md:px-12 lg:px-24 pb-20">
        <PositionApplied/>
        <PositionSaved/>
      </div>
    </div>
  );
}

function PositionApplied() {

  return (
    <div>
    <div className="font-header font-bold text-2xl lg:text-3xl mb-6">
      Positions Applied
    </div>
    {/*TODO: Fetching from database*/}
    {Object.values(inputData).map((job, index) => {
        return (<PositionCardApplied key={index} {...job}/>)
    })}
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

// Card components (require a lot of refactoring)
function PositionCardApplied(JobData: JobDataType) {
    const [isShowMore, setIsShowMore] = useState(false);
    const ApplicationStatus = "Completed ✅"
    return (
    <div className="shadow-xl flex flex-cols p-4 place-content-between mb-8 bg-blue-100 hover:bg-blue-200 font-body">
        <div className="w-full">
          <div className="text-left font-bold text-xl font-header">
            {JobData.title}
          </div>
          <div>{JobData.department} - {JobData.semester}</div>
          {isShowMore && <div className="text-gray-600 text-sm md:text-base lg:pr-16">
            {JobData.description}
          </div>}
        </div>
        <div className="min-w-36 w-fit h-auto flex flex-col text-right  place-content-between">
          <div className="font-bold">{ApplicationStatus}</div>
            <div className="align-bottom text-sm">
              {/* Conditional Rendering */}
              {isShowMore === false ? (
                  <button onClick={() => setIsShowMore(true)}>
                    View more details  ▼
                  </button>
              ) : (
                  <button onClick={() => setIsShowMore(false)}>
                    Collapse   ▲
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