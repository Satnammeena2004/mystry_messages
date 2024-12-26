import { UserType } from "@/models/User";
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
import { signOut } from "next-auth/react";

export type UserProfileType = {
  name: string;
  username?: string;
  image: string;
  email: string;
};

const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg";

export default function UserProfile({
  name,
  username,
  email,
  image = defaultImage,
}: UserProfileType) {
  console.log(username ?? name);
  return (
    <div className="flex items-center gap-x-2">
      <div className="font-medium">Welcome, {username}</div>
      <div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={image} alt="@shad" />
            <AvatarFallback>
              {(username ?? name)?.substring(0, 2)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white ">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User /> {(username ?? name)}
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
}
