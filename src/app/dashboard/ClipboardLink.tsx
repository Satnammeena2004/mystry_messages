"use client";

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constant";
import { useToast } from "@/hooks/use-toast";
import { CornerRightDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCopyToClipboard } from "usehooks-ts";

function ClipboardLink() {
  const toast = useToast()
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
  const username = useSession().data?.user.username;

  return (
    <div>
    <div className="flex items-center">

    <p className="font-medium text-xs">copy url for send message </p>
    <CornerRightDown className="translate-y-3 " />
    </div>
    <div className="flex px-2 gap-x-2 border-transparent rounded-md p-1 bg-gray-100 w-fit  ">
      <input
        type="text"
        className="p-2 bg-transparent rounded-md w-96"
        disabled
        value={"https:localhost:3000/u/" + username}
        />
      <Button onClick={() => handleCopy(BASE_URL + "/u/" + username)
      }>
      Copy
      </Button>
    </div>
        </div>
  );
}

export default ClipboardLink;
