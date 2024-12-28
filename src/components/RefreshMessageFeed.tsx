"use client";
import { refreshMessageThread } from "@/app/actions";
import { RefreshCw } from "lucide-react";

export default function RefreshMessageFeed() {
  return (
    <button onClick={refreshMessageThread} className="flex justify-center items-center p-2 translate-x-4 border rounded-md">
      <RefreshCw className="" />
    </button>
  );
}
