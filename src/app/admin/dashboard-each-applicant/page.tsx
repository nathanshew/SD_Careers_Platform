"use client";
import { Participant } from '@/lib/types';
import React, { useState, useEffect } from 'react';


const mockParticipant: Participant = {
    name: 'John Doe',
    status: 'Pending',
    positionApplied: 'Software Engineer',
    department: 'Engineering',
    yearOfStudy: '4',
    major: 'Computer Science',
    faculty: 'School of Computing',
    linkedInUrl: 'https://linkedin.com/in/johndoe',
    resumeLink: 'https://example.com/resume',
    whyNFS: 'Passionate about fintech and innovation',
    interviewDate: '2024-12-01',
    interviewer: 'Jane Smith',
    interviewDecision: 'TBD'
};

// Simulate API call
const fetchParticipant = (): Promise<Participant> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockParticipant);
        }, 1000); 
    });
};

export default function AdminDashboardEachApplicantPage() {
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchParticipant()
            .then((data) => {
                setParticipant(data);
                setLoading(false);
            })
            .catch(() => {
                setParticipant(null);
                setLoading(false);
            });
    }, []);

    const renderDetail = (label: string, value: string) => (
        <div className="grid grid-cols-3 w-full items-center pb-3">
            <label className="text-left font-bold col-span-1">{label}</label>
            <span className="col-span-2 p-2 border border-gray-300 bg-gray-100 rounded-md">
                {value}
            </span>
        </div>
    );

    const renderTextAreaDetail = (label: string, value: string) => (
        <div className="grid grid-cols-3 w-full items-start pb-3">
            <label className="text-left font-bold col-span-1">{label}</label>
            <textarea
                className="col-span-2 p-2 border border-gray-300 bg-gray-100 rounded-md h-32 resize-none overflow-y-auto"
                readOnly
                value={value}
            />
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-2xl">Loading participant data...</p>
            </div>
        );
    }

    if (!participant) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-2xl text-red-500">No participant data available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-sans">
            <div className="flex flex-row w-full max-w-6xl p-4 items-start">
                <button
                    type="button"
                    className="font-bold bg-blue-900 text-white rounded-full py-2 px-6 mr-24 mt-12"
                    onClick={() => window.history.back()}
                >
                    &lt; Back
                </button>
                <div className="flex flex-col gap-6 p-8 w-full max-w-4xl border border-gray-200 shadow-md rounded-lg bg-white mb-12 mt-12">
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-6">Participant Submission</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {renderDetail('Name', participant.name)}
                        {renderDetail('Status', participant.status)}
                        {renderDetail('Position Applied', participant.positionApplied)}
                        {renderDetail('Department', participant.department)}
                        {renderDetail('Year of Study', participant.yearOfStudy)}
                        {renderDetail('Major', participant.major)}
                        {renderDetail('Faculty', participant.faculty)}
                        {renderDetail('LinkedIn URL', participant.linkedInUrl)}
                        {renderDetail('Resume Link', participant.resumeLink)}
                        {renderDetail('Why NFS?', participant.whyNFS)}
                        {renderDetail('Interview Date', participant.interviewDate)}
                        {renderDetail('Interviewer', participant.interviewer)}
                        {renderTextAreaDetail('Interview Decision', participant.interviewDecision)}
                    </div>
                </div>
            </div>
        </div>
    );
}
