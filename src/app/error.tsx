// app/error.tsx
"use client"; // This is needed for the error boundary to work
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen dark:bg-zinc-900">
      <div className="text-center p-6 rounded-2xl   max-w-md w-full">
        <h1 className="text-7xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Something went wrong</h2>
        <p className="mb-6 text-gray-600">
          We encountered an unexpected error. Please try again or go back home.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
