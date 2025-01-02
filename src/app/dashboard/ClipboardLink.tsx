"use client";

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constant";
import { CornerRightDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCopyToClipboard } from "usehooks-ts";

export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

function ClipboardLink() {
  const [copiedText, copy] = useCopyToClipboard();
  const handleCopy = (text: string) => {
    copy(text)
      .then((copied) => {
        console.log("Copy ", copied);
      })
      .catch((err) => {
        console.log("Error in copied text", err);
      });
  };
  const session = useSession();

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

  // reloadSession();
  // }
  return (
    <div className="">
      <div className="flex items-center">
        <p className="font-medium text-xs">copy url for send message </p>
        <CornerRightDown className="translate-y-3 " />
      </div>
      <div className="flex px-2 gap-x-2 border-transparent rounded-md p-1 w-full bg-gray-100  flex-col md:flex-row md:w-fit">
        <input
          type="text"
          className="p-2 bg-transparent rounded-md md:w-96 w-full text-sm md:text-base"
          disabled
          value={"https:localhost:3000/u/" + (username ? username : "")}
        />
        <Button
          onClick={() => {
            handleCopy(BASE_URL + "/u/" + username);
          }}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}

export default ClipboardLink;
