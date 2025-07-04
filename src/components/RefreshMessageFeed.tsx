"use client";
import { refreshMessageThread } from "@/app/actions";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

export default function RefreshMessageFeed() {
  return (
    <Button
      onClick={refreshMessageThread}
      className="flex bg-transparent justify-center items-center p-2 translate-x-4 border rounded-md hover:bg-transparent"
    >
      <RefreshCw className="dark:text-white text-black" />
    </Button>
  );
}
