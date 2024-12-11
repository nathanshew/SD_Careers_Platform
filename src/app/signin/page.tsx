"use client";

import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)]">
            <form className="flex flex-col items-center gap-4 p-6 w-3/4 md:w-1/2 lg:w-1/3">
                <h2 className="text-3xl font-bold text-blue-900 w-full text-left">Sign In</h2>
                <hr className="border-blue-900 w-full mb-4" />
                <div className="flex w-full items-center gap-4 pb-3">
                    <label htmlFor="email" className="w-1/4 text-left">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        className="w-3/5 rounded-2xl border-gray-200 bg-gray-200 focus:ring-blue-900 focus:border-blue-900"
                    />
                </div>
                <div className="flex w-full items-center gap-4">
                    <label htmlFor="password" className="w-1/4 text-left">Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                        className="w-3/5 rounded-2xl border-gray-200 bg-gray-200  focus:ring-blue-900 focus:border-blue-900"
                    />
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="staysignedin"
                        className="text-blue-800 focus:ring-0"
                    />
                    <label htmlFor="staysignedin" className="text-sm text-gray-600">
                        Stay signed in
                    </label>
                </div>
                <div className="w-full flex justify-center mt-4">
                    <button
                        type="submit"
                        className="w-40 font-bold bg-gradient-to-r from-blue-900 to-yellow-500 text-white rounded-full py-2 hover:opacity-90"
                    >
                        Sign In
                    </button>
                </div>
                <hr className="border-blue-900 w-full mt-4" />
                <div className="text-sm mt-4 text-gray-600">
                    Don’t have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-yellow-500 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}
