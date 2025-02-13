import React from "react";
import UserProfile, { UserProfileType } from "./UserProfile";
import { auth } from "@/lib/auth";
import Link from "next/link";
import ModeToggle from "./ThemeButton";
import Image from "next/image";
import Logo from "../../public/logo.jpg";

async function Navbar() {
  const session = await auth();
  const status = session !== null ? "authenticated" : "unauthenticated";
  const user: UserProfileType = { ...session?.user } as UserProfileType;
  return (
    <div
      suppressHydrationWarning
      className="flex justify-between dark:backdrop-blur-lg items-center px-4 py-2 w-full border dark:border-none font-Inter "
    >
      <div className="flex items-center px-2">
        <Link href={"/"} className="flex items-center">
          {/* <LucideMessageCircleQuestion className="w-8 h-8 md:w-6 md:h-6" /> */}
          <div className="items-center  flex gap-x-2">
            <Image
              className="rounded-md "
              src={Logo}
              alt="logo"
              width={26}
              height={26}
            />
            <h3 className="dark:text-sm font-semibold tracking-tighter font-['Giest'] capitalize hidden sm:block">
              Mystry Messages
            </h3>
          </div>
        </Link>
      </div>

      {/* {status === "authenticated" ? ( */}
      <div className="flex gap-x-3">
        <UserProfile {...user} status={status} />
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
