// app/not-found.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen ">
      <div className="text-center p-6 rounded-2xl shadow-lg  max-w-md w-full">
        <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
