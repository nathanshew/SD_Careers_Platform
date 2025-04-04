'use client';

export default function Fallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}