"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CornerRightDown, Loader2 } from "lucide-react";
import {  useParams } from "next/navigation";
import { experimental_useObject as useObject } from "ai/react";
import { GenerateMessageSchema } from "@/schemas/generateMessageSchema";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

function Page() {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const { object, submit, isLoading } = useObject({
    api: "/api/generate-messages",
    schema: GenerateMessageSchema,
    
  });
  const { userName } = useParams<{ userName: string }>();

  return (
    <div>
      <div className="sm:w-3/4 max-w-2xl w-full mx-auto md:pt-12 lg:pt-4 py-8 px-8">
        <h1 className="text-3xl font-medium text-center mb-4">
          Public Profile Link
        </h1>
        <div className="relative">
  

          <Label htmlFor="message" className="text-xs">
            Write a anonymous message for @{decodeURIComponent(userName)}
            <CornerRightDown className="translate-y-2  inline" />
          </Label>
          <Textarea
          disabled={isSending}
            maxLength={100}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="resize-none h-36 mt-2"
            placeholder="max 100 characters..."
            id="message"
          />
          <Button
          disabled={isSending}  
            variant="outline"
            className="absolute bottom-2 w-4/5 bg-blue-500 hover:bg-blue-600 left-1/2 -translate-x-1/2"
            onClick={async () => {
              if (!message || message == "") {
                return;
              }
              try {
                setIsSending(true);
                const res = await axios.post("/api/send-message", {
                  username: decodeURIComponent(userName),
                  content: message,
                });
                
                if (res.status === 200) {
                  toast({ title: "message sent", variant: "success" });
                  setMessage("");
                  return;
                }
              } catch (err) {

                if (err.status === 403) {
                  toast({ title: "user is not accepting message now" });
                  return;
                }
                toast({
                  title: "something went wrong",
                  variant: "destructive",
                });
                console.log(err);
              }finally{
                setIsSending(false);
              }
            }}
            >
           {isSending?"Sending": "Send"}
          </Button>
  
        </div>
        <div className="my-8">
          {(!object && !isSending) && (
            <Button onClick={() => submit("Generate")} className="mx-auto">
              Generate Messages
            </Button>
          )}
        </div>
        {isLoading && (
          <Button className="h-8 flex items-center justify-center mt-4">
            <Loader2 className="inline animate-spin" />
            {/* <BotMessageSquare size={48} color="#ffffff" /> */}
            <span>AI is thinking...</span>
          </Button>
        )}
        <div className="flex flex-col gap-y-2 mt-10">
          {object?.map((m, index) => (
            <button
              onClick={() => setMessage(m?.message as string)}
              key={index}
              className="p-2 border rounded-md bg-slate-50"
            >
              {m?.message}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
