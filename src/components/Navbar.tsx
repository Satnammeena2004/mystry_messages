"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { LucideMessageCircleQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import UserProfile, { UserProfileType } from "./UserProfile";

function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user: UserProfileType = session?.user;
  return (
    <div className="flex justify-between bg-white items-center px-4 py-2 w-full border font-Inter ">
      <div className="flex items-center px-2">
        <LucideMessageCircleQuestion className="w-8 h-8 md:w-6 md:h-6"/>
        <h1 className="uppercase text-semibold hidden sm:block">Mystery Messages</h1>
      </div>
      {status === "authenticated" ? (
        <div className="flex gap-x-3">
          <UserProfile {...user} />
        </div>
      ) : (
        <div className="flex mr-2 gap-x-2">
          <Button onClick={() => signIn()}>Login</Button>
          <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
