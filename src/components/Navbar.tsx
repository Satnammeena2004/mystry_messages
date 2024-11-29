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
    <div className="flex justify-between items-center px-4 py-2 w-full border ">
      <div className="flex items-center px-2">
        <LucideMessageCircleQuestion />
        <h1 className="uppercase text-semibold">Mystery Messages</h1>
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
