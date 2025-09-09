"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { ApiResponseType } from "@/types/ApiResponse";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { isMobileDevice } from "@/helpers/constant";
import { refreshMessageThread } from "@/app/actions";

const AlertDialogDemo = ({
  children,
  messageId,
  userId,
}: {
  children: React.ReactNode;
  messageId: string;
  userId: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay className="fixed inset-0 bg-blackA8 data-[state=open]:animate-overlayShow" />
        <AlertDialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <AlertDialogTitle className="m-0 text-[17px] font-medium text-mauve12">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
            This action cannot be undone. This will permanently delete your
            message.
          </AlertDialogDescription>
          <div className="flex justify-end items-center gap-[25px]">
            <AlertDialogCancel asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none">
                Cancel
              </button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                className="inline-flex h-[35px] bg-red-400 text-white items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none"
                onClick={async () => {
                  const resp = await axios.post<ApiResponseType>(
                    location.origin +
                      "/api/delete-message/" +
                      messageId +
                      "?userId=" +
                      userId
                  );

                  if (resp.data.success) {
                    refreshMessageThread();
                    toast({
                      title: "Message Deleted",
                      description: "Message Deleted Successfully",
                    });
                    return;
                  }
                  toast({
                    title: "something went wrong",
                    description: "Message not Deleted ",
                  });
                }}
              >
                Yes, delete message
              </button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

type MessageCardProps = {
  message: string;
  msg_id: string;
  userId: string;
};

function MessageCard({ message, msg_id, userId }: MessageCardProps) {
  return (
    <div>
      <Card
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("messageId", msg_id);
          e.dataTransfer.setData("userId", userId);
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.cursor = "grab";
        }}
        onDragEnd={(e) => {
          // Reset opacity after drag ends
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.cursor = "";
        }}
        className="sm:w-[300px] p-2 dark:bg-black/90 min-h-24 relative"
      >
        {isMobileDevice() && (
          <AlertDialogDemo messageId={msg_id} userId={userId}>
            <span className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer">
              <Trash2Icon size={14} />
            </span>
          </AlertDialogDemo>
        )}
        <CardHeader>
          <CardTitle className="capitalize font-normal">{message}</CardTitle>
        </CardHeader>
        {/* <CardContent>{message}</CardContent> */}
      </Card>
    </div>
  );
}

export default MessageCard;
