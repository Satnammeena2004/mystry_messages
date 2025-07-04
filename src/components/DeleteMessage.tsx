"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";

import { ArrowDownRight, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import axios from "axios";
import { ApiResponseType } from "@/types/ApiResponse";
import { deleteMessageById } from "@/app/actions";
import { toast } from "@/hooks/use-toast";

const DeleteMessage = () => {
  const [msg_id, setMsgId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const refBtn = useRef<HTMLButtonElement>(null);
  const refCancel = useRef<HTMLButtonElement>(null);
  const handleSend = deleteMessageById.bind(null);

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
        <AlertDialogContent className="max-w-[300px] min-w-[250px] z-20 bg-black text-white dark:bg-black dark:border dark:border-white rounded-md p-8 fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 before:content-[''] before:-z-10 before:absolute before:inset-0 before:w-[200vw] before:h-[200vh] before:bg-black/90 before:opacity-50 before:-translate-x-1/3 before:-translate-y-1/3">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 my-3">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3">
            <AlertDialogCancel ref={refCancel} className="p-2 px-3">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 p-2 px-3 rounded-md"
              onClick={async () => {
                const resp = await axios.post<ApiResponseType>(
                  location.origin +
                    "/api/delete-message/" +
                    msg_id +
                    "?userId=" +
                    userId
                );
                if (resp.data.success) {
                  handleSend(msg_id, userId);
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
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
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
