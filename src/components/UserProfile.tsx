"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, Mail, User } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export type UserProfileType = {
  name: string;
  username?: string;
  image: string;
  email: string;
} & { status: string };

export default function UserProfile({
  name,
  username,
  email,
  status,
}: UserProfileType) {
  console.log(username ?? name);
  const router = useRouter();
  const authenticated = (
    <div className="flex items-center gap-x-2">
      <div className="font-medium hidden sm:block">
        Welcome, {username ?? name}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="border flex justify-center items-center">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${
                  username ?? name
                }&rounded=true`}
                alt="@shad"
              />
              <AvatarFallback>
                {(username ?? name)?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-black ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User /> {username ?? name}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              {" "}
              <Mail />
              {email}{" "}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut({ redirectTo: "/sign-in" });
              }}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
  return status === "authenticated" ? (
    authenticated
  ) : (
    <div className="flex mr-2 gap-x-2">
      <Button onClick={() => signIn()}>Login</Button>
      <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
    </div>
  );
}
