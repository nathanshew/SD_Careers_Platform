import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import React, { Suspense } from "react";

import { Montserrat, Roboto } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Fallback from "./components/Fallback";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";

import { AuthProvider } from "@/components/AuthProvider";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight:["700", "600", "400", "300"],
  variable: '--font-montserrat',
});

const roboto = Roboto({ 
  subsets: ['latin'],
  weight:["400","500","700"],
  variable: '--font-roboto',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fintech Society Careers Platform",
  description: "A platform for students to apply for roles in the Fintech Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable}
          ${roboto.variable}
          ${geistSans.variable}
          ${geistMono.variable}
        antialiased`}
      >
        <Suspense fallback={<Fallback />}>
          <AuthProvider>
            <Navbar />
              <ReactQueryClientProvider>
                {children}
              </ReactQueryClientProvider>
            <Footer />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
