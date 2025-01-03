"use client";

import checkmark from "@/app/components/confirmation/checkmark.png";

import Image from "next/image";

export default function ConfirmationPage() {

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Job Role Title */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold">UI/UX Designer</h1>
        <p className="text-lg">Software Development - Semester 1</p>
        <p className="text-lg">1-5 Positions Available</p>
      </section>

      <div className="flex items-center justify-center space-x-4 mt-8">
        <Image
          src={checkmark}
          alt="Confirmation Checkmark"
          width={80}
          height={80}
        />
        <h1 className="text-3xl">Thank you!</h1>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-8">
        <h2 className="text-xl">
          Your application is successfully submitted, we will be in touch with
          you shortly.
        </h2>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-8">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
          Return to dashboard
        </button>
      </div>
    </div>
  );
}
