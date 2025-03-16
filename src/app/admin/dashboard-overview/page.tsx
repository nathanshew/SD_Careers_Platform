"use client";
import { Application, Participant } from "@/lib/types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { handleResponse } from "@/utils/handleResponse";

// get all department names
const departments = [
  "All",
  "SD",
  "Blockchain",
  "Quant",
  "ML",
  "External",
  "Internal",
];

/*
At this stage, filtering applicants is handled by frontend. 
*/
export default function AdminDashboardOverviewPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0]);
  const [selectedPositionTitle, setSelectedPositionTitle] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Fetch applicants data
  const { data: applications, isLoading: isLoadingApplications, isError: isErrorApplications } = useQuery(
    ["applications"],
    async () => {
      console.log(`fetching applicants from: ${process.env.NEXT_PUBLIC_API_URL}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application`);
      return (await handleResponse(response));
    }
  );

  function handleSelectDepartment(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const value = target.getAttribute("id");
    if (value) setSelectedDepartment(value);
  }

  const DepartmentTabs = () => {
    return (
      <div className="cursor-pointer mt-5 flex flex-row md:text-2xl font-header font-bold text-blue-900 gap-3 place-content-between">
        {departments.map((name) => (
          <div
            key={name + "&" + departments}
            id={name}
            className="w-full text-center"
            onClick={handleSelectDepartment}
          >
            {name.toUpperCase()}
            {name === selectedDepartment && (
              <hr className="border-orange-400 border-2 w-full" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderApplicationStatus = (status: string) => {
    if (status == "Accept") {
      return <div className="text-blue-900">Accepted</div>;
    } else if (status == "Pending") {
      return <div className="text-yellow-600">Pending</div>;
    } else if (status == "Rejected") {
      return <div className="text-red-600">Rejected</div>;
    } else {
      return <div className="text-yellow-600">Application in Progress</div>;
    }
  };

  function filterParticipant(participant: Participant): boolean {
    function filterInput(input: string, target: string) {
      if (input === '') {
        return true;
      } else if (input.length > target.length) {
        return false;
      } else {
        return input == target.substring(0, input.length)
      }
    }
    const filterByDepartment = selectedDepartment === "All" || participant.department === selectedDepartment;
    const filterByPositionTitle = filterInput(selectedPositionTitle, participant.positionApplied);
    const filterByStatus = filterInput(selectedStatus, participant.status);
    return filterByDepartment && filterByPositionTitle && filterByStatus;
  }

  // Handle loading and error states
  if (isLoadingApplications) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-2xl">Loading data...</p>
      </div>
    );
  }
  if (isErrorApplications) return <div>Error fetching applicants data</div>;

  return (
    <div className="min-h-screen flex flex-col font-sans text-sm md:text-base mx-10 md:mx-36">
      <DepartmentTabs />
      {/* Filter tabs */}
      <div className="flex flex-row gap-4 font-body py-5 text-black">
        <div className="py-1">Filters: </div>
        <input
          className="bg-gray-300 w-full max-w-48 px-2 py-1 rounded-full"
          placeholder="Position Title"
          value={selectedPositionTitle}
          onChange={(e) => setSelectedPositionTitle(e.target.value)}
          key="position-title-input"
        />
        <input
          className="bg-gray-300 w-full max-w-48 px-2 py-1 rounded-full"
          placeholder="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        />
      </div>
      <div className="mb-10 h-fit flex flex-col gap-3">
        {applications
          .filter(filterParticipant)
          .map((application: Application, index: number) =>
            <div
              key={index}
              className="bg-gray-300 text-black rounded-xl px-10 py-4 font-body grid grid-cols-3 w-full items-center place-content-between"
            >
              <div className="text-left">{application.name}</div>
              <div className="text-center">{application.job_id}</div>
              <div className="text-right">{renderApplicationStatus(application.status)}</div>
            </div>
          )}
      </div>
    </div>
  );
}
