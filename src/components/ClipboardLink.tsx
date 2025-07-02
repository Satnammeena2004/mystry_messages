"use client";

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constant";
import { CornerRightDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEffect } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

function ClipboardLink() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [, copy] = useCopyToClipboard();
  const [isTextCopied,setIsTextCopied] = useState(false)
  const session = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleCopy = (text: string) => {
    copy(text)
      .then((copied) => {
        console.log("Copy ", copied);
      })
      .catch((err) => {
        console.log("Error in copied text", err);
      });
  };

  const username = session?.data?.user.username;
  // function handleSession(){
  //   session.update({

  //     ...session,
  //     data: {
  //         ...session?.data,
  //         user:{
  //             ...session?.data?.user,
  //             username:"sheheheheheh"
  //         }
  //     }
  // })
  const systemThemes = theme === "system" ? systemTheme : theme;
  return (
    <div className="">
      <div className="flex items-center ">
        <p className="font-medium text-xs">copy url for send message </p>
        <CornerRightDown className="translate-y-3 " />
      </div>
      <div className="flex px-2 gap-x-2 border-transparent rounded-md p-1 w-full bg-white dark:bg-black dark:border  flex-col md:flex-row md:w-fit ">
        <input
          style={{
            backgroundColor:
              systemThemes === "dark" ? "rgb(22, 22, 22)" : "white",
          }}
          type="text"
          className="p-2 bg-transparent  rounded-md md:w-96 w-full text-sm md:text-base   dark:border-black "
          disabled
          value={"https:localhost:3000/u/" + (username ? username : "")}
        />
        <Button
          style={{
            backgroundColor:
              systemThemes === "dark" ? "rgb(22, 22, 22)" : "white",
          }}
          className="dark:bg-black/90 dark:text-white text-black dark:border-white"
          onClick={() => {
            handleCopy(BASE_URL + "/u/" + username);
            setIsTextCopied(true)
            setTimeout(()=>setIsTextCopied(false),2000)
          }}
        >
         {isTextCopied?'copied':"copy"}
        </Button>
      </div>
    </div>
  );
}

export default ClipboardLink;
