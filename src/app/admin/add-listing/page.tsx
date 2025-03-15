"use client";
import React from 'react';

export default function AdminDashboardPage() {
    const renderDetail = (label: string) => (
        <div className="grid grid-cols-3 w-full items-center pb-3">
            <label className="text-left font-bold col-span-1">{label}</label>
            <input
                type="text"
                className="col-span-2 p-2 border border-gray-300 bg-gray-100 rounded-md"
            />
        </div>
    );

    const renderTextAreaDetail = (label: string) => (
        <div className="grid grid-cols-3 w-full items-start pb-3">
            <label className="text-left font-bold col-span-1">{label}</label>
            <textarea
                className="col-span-2 p-2 border border-gray-300 bg-gray-100 rounded-md h-32 resize-none overflow-y-auto"
            />
        </div>
    );

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
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-6">Create Listing</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {renderDetail('Title:')}
                        {renderTextAreaDetail('Role Description:')}
                        {renderTextAreaDetail('Candidate Description:')}
                        {renderDetail('Start Date:')}
                        {renderDetail('End Date:')}
                        {renderDetail('Contact Person:')}
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="font-bold bg-blue-900 text-white rounded-full py-2 px-6"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
