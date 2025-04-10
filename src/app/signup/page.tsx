"use client";

import { useState } from "react";
import Link from "next/link";
import { handleResponse } from "@/utils/handleResponse";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUpPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                }),
            });
        
            await handleResponse(response)
            
            // Redirect to signup/verified/page.tsx
            router.push(`/signup/verification?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`);
        } catch (error) {
            console.log(error)
            console.log("SIGN UP ERROR")
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)]">
            <form className="flex flex-col items-center gap-4 p-6 w-3/4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-blue-900 w-full text-left">Create Account</h2>
                <hr className="border-blue-900 w-full mb-4" />
                <div className="flex w-full items-center gap-4 pb-3">
                    <label htmlFor="email" className="w-1/4 text-left">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-3/5 rounded-2xl border-gray-200 bg-gray-200 focus:ring-blue-900 focus:border-blue-900"
                    />
                </div>
                <div className="flex w-full items-center gap-4 pb-3">
                    <label htmlFor="username" className="w-1/4 text-left">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </div>
                <hr className="border-blue-900 w-full mt-4" />
                <div className="text-sm mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link
                        href="/signin"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-yellow-500 hover:underline">
                        Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
}
