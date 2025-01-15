"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCookiesSet, setIsCookiesSet] = useState<boolean>(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const username = searchParams.get("username");
    const email = searchParams.get("email");

    if (!token || !username || !email) {
      throw new Error("Missing query fields");
    }

    {/*Note: Browser cookies currently set to have no expiry date */}
    document.cookie = `token=${encodeURIComponent(token)}; path=/;`;
    document.cookie = `username=${encodeURIComponent(username)}; path=/;`;
    document.cookie = `email=${encodeURIComponent(email)}; path=/;`;

    console.log(`${username} logged in successfully`);
    setIsCookiesSet(true);

    const timer = setTimeout(() => {
      router.push("/"); // Automatic redirect after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-6 p-8 w-3/4 md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-blue-900 text-center">
          You have signed in successfully.
        </h2>
        <p className="text-gray-600 text-center">
          Automatically redirecting you to homepage...
        </p>
        {isCookiesSet ? (
          <p className="text-center text-gray-600">
            <Link href="/" className="text-blue-900 hover:underline">
              click me
            </Link>{" "}
            if not redirected
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
