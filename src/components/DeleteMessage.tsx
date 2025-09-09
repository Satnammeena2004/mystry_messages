"use client";
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

import { ArrowDownRight, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import axios from "axios";
import { ApiResponseType } from "@/types/ApiResponse";
import {  refreshMessageThread } from "@/app/actions";
import { toast } from "@/hooks/use-toast";

const DeleteMessage = () => {
  const [msg_id, setMsgId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const refBtn = useRef<HTMLButtonElement>(null);
  const refCancel = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      e.stopPropagation();
      refCancel.current?.click();
    });
  }, []);
  return (
    <div className="flex">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button ref={refBtn}></button>
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay className="fixed inset-0 bg-blackA8 data-[state=open]:animate-overlayShow" />
          <AlertDialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
            <AlertDialogHeader>
              <AlertDialogTitle className="m-0 text-[17px] font-medium text-mauve12">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
                This action cannot be undone. This will permanently delete your
                message and remove your message from our server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-[25px] mt-3">
              <AlertDialogCancel
                ref={refCancel}
                className="inline-flex h-[35px]"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={async () => {
                    const resp = await axios.post<ApiResponseType>(
                      location.origin +
                        "/api/delete-message/" +
                        msg_id +
                        "?userId=" +
                        userId
                    );
                    if (resp.data.success) {
                     refreshMessageThread()
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
                  className="inline-flex h-[35px] bg-red-400 text-white items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none"
                >
                  Yes, delete message
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
      <div className="mx-auto relative z-10">
        <p className="absolute -top-12 whitespace-nowrap">
          Drag here to delete <ArrowDownRight />
        </p>
        <button
          disabled={isDraggingOver}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => {
            setIsDraggingOver(false);
          }}
          onDragEnd={() => refBtn.current?.click()}
          onDrop={async (e) => {
            e.preventDefault();
            setIsDraggingOver(false);
            const messageId = e.dataTransfer.getData("messageId");
            const userId = e.dataTransfer.getData("userId");

            if (!messageId || !userId) {
              toast({
                title: "Invalid drag and drop",
                description: "Please drag a valid message",
                variant: "destructive",
              });
              return;
            }

            setMsgId(messageId);
            setUserId(userId);
            refBtn.current?.click();
          }}
          className={` p-2 rounded-full transition-all duration-200  ${
            isDraggingOver && "bg-red-100 scale-110"
          }`}
        >
          <Trash2
            className={`w-20 h-20 ${isDraggingOver ? "text-red-500" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default DeleteMessage;
