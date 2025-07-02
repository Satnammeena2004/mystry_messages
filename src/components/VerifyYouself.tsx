"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

const VerifyYouself = () => {
  const session = useSession();
  const [isExpanded, setIsExpanded] = useState(true);

  console.log("session in usersrsrsrs", session);
  if (!session.data?.user?.isVerified && session.status === "authenticated") {
    return (
      <div className="">
        <div
          className={`bg-yellow-100 border-l-4 border-yellow-500 p-2 mb-2 cursor-pointer transition-all duration-300 ease-in-out
            ${isExpanded ? "w-full" : "w-[70px] overflow-hidden"} relative`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center whitespace-nowrap">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className={`ml-3 flex-1 flex justify-between pr-10 items-center ${
                isExpanded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            >
              <p className="text-sm text-yellow-700">
                Your account is not verified yet. Please complete the
                verification process.
              </p>
              <Link
                className="bg-yellow-500 rounded-sm p-1 text-sm flex items-start gap-x-1 hover:gap-x-3 transition-all"
                href={"/verify/" + session.data.user.username}
              >
                <span>Verify Now</span>
              </Link>
            </div>
          </div>
          <Button
            className="absolute w-2 h-full  top-0 right-0 bg-yellow-100"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronLeft className="text-black hover:text-white" />
            ) : (
              <ChevronRight className="text-black hover:text-white" />
            )}
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

export default VerifyYouself;
