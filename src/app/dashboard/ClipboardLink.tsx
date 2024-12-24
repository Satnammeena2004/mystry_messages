"use client";

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constant";
import { useSession } from "next-auth/react";
import { useCopyToClipboard } from "usehooks-ts";

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
  const username  = useSession().data?.user.username
  console.log("user",username)

  return (
    <div>
      <Button onClick={() => handleCopy(BASE_URL+"/u/"+username)}>Copy</Button>
                                                                                                                                                                                                            
    </div>
  );
}

export default ClipboardLink;
