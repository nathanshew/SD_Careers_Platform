"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { handleResponse } from "@/utils/handleResponse";
import { useAuth } from "@/components/AuthProvider";

export default function SignInPage() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [redirectToFrontend, setRedirectToFrontend] = useState<string>("");
  const [
    redirectToFrontendVerifiedSignup,
    setRedirectToFrontendVerifiedSignup,
  ] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleManualSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await handleResponse(response);
      if (!data.token || !data.username || !data.email) {
        throw new Error("Invalid response from server");
      }

      // Store in cookies
      {
        /*Note: Browser cookies currently set to have no expiry date */
      }
      document.cookie = `token=${encodeURIComponent(data.token)}; path=/;`;
      document.cookie = `username=${encodeURIComponent(
        data.username
      )}; path=/;`;
      document.cookie = `email=${encodeURIComponent(data.email)}; path=/;`;
      document.cookie = `role=${encodeURIComponent(data.role)}; path=/;`;
      setIsAuthenticated(true);

      console.log(`${data.username} signed-in successfully`);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login?redirect_to_frontend=${redirectToFrontend}&redirect_to_frontend_verified_signup=${redirectToFrontendVerifiedSignup}`;
  };

  const handleLinkedInSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/linkedIn/login?redirect_to_frontend=${redirectToFrontend}&redirect_to_frontend_verified_signup=${redirectToFrontendVerifiedSignup}`;
  };

  useEffect(() => {
    setRedirectToFrontend(`${window.location.origin}/signin/success`);
    setRedirectToFrontendVerifiedSignup(
      `${window.location.origin}/signup/verified`
    );
  }, []);

  return (
    <>
      {redirectToFrontend ? (
        <div className="min-h-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-col items-center gap-4 p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <form className="w-full" onSubmit={handleManualSignIn}>
              <h2 className="text-3xl font-bold text-blue-900 w-full text-left">
                Sign In
              </h2>
              <hr className="border-blue-900 w-full mb-4" />
              <div className="flex w-full items-center gap-4 pb-3">
                <label htmlFor="email" className="w-1/4 text-left">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-3/5 rounded-2xl border-gray-200 bg-gray-200 focus:ring-blue-900 focus:border-blue-900"
                />
              </div>
              <div className="flex w-full items-center gap-4">
                <label htmlFor="password" className="w-1/4 text-left">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-3/5 rounded-2xl border-gray-200 bg-gray-200  focus:ring-blue-900 focus:border-blue-900"
                />
              </div>
              {/* <div className="flex items-center justify-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="staysignedin"
                  className="text-blue-800 focus:ring-0"
                />
                <label htmlFor="staysignedin" className="text-sm text-gray-600">
                  Stay signed in
                </label>
              </div> */}
              {error && <p className="text-red-600 text-center mt-3 font-medium">{error}</p>}
              <div className="w-full flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-40 font-bold bg-gradient-to-r from-blue-900 to-yellow-500 text-white rounded-full py-2 hover:opacity-90"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
            <div className="flex items-center w-full mt-4">
              <hr className="border-blue-900 flex-grow" />
              <span className="px-3 text-gray-600 text-sm">or</span>
              <hr className="border-blue-900 flex-grow" />
            </div>
            <div className="flex flex-col items-center space-y-4 w-full max-w-md">
              <button
                onClick={handleGoogleSignIn}
                className="w-4/5 rounded-2xl px-6 py-3 bg-white border border-gray-300 text-gray-700 shadow-md flex items-center justify-center space-x-3 hover:bg-gray-100"
              >
                <FcGoogle size={24} />
                <span className="font-bold">Sign in with Google</span>
              </button>
              <button
                onClick={handleLinkedInSignIn}
                className="w-4/5 rounded-2xl px-6 py-3 text-white bg-blue-700 hover:bg-blue-800 shadow-md flex items-center justify-center space-x-3"
              >
                <FaLinkedin size={24} />
                <span className="font-bold">Sign in with LinkedIn</span>
              </button>
            </div>
            <hr className="border-blue-900 w-full mt-4" />
            <div className="text-sm mt-4 text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-yellow-500 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}{" "}
    </>
  );
}
