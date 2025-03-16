"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { handleResponse } from "@/utils/handleResponse";
import React from "react";

export default function VerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";
  const email = searchParams.get("email") || "";
  
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        method: "POST",
        credentials: "include", // Important: maintain session cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: verificationCode
        }),
      });
      
      const data = await handleResponse(response);
      console.log("Verification successful:", data);
      
      // After successful verification, proceed to password setting
      router.push(`/signup/verified?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <form className="flex flex-col items-center gap-4 p-6 w-3/4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-blue-900 w-full text-left">Verify Email</h2>
        <hr className="border-blue-900 w-full mb-4" />
        <p>Please enter the verification code sent to {email}</p>
        <div className="flex w-full items-center gap-4 pb-3">
          <label htmlFor="code" className="w-1/4 text-left">Code</label>
          <input
            id="code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            className="w-3/5 rounded-2xl border-gray-200 bg-gray-200 focus:ring-blue-900 focus:border-blue-900"
          />
        </div>
        {error && <p className="text-red-600 text-center mt-3 font-medium">{error}</p>}
        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-40 font-bold bg-gradient-to-r from-blue-900 to-yellow-500 text-white rounded-full py-2 hover:opacity-90"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </div>
  );
}