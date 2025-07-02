"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import { deleteMessageById } from "@/app/actions";
// import axios from "axios";
// import { ApiResponseType } from "@/types/ApiResponse";
// import { BASE_URL } from "@/helpers/constant";
// import { toast } from "@/hooks/use-toast";
// import { Trash2 } from "lucide-react";
// import { useRef, useState } from "react";

type MessageCardProps = {
  message: string;
  msg_id: string;
  userId: string;
};

function MessageCard({ message, msg_id, userId }: MessageCardProps) {
  // const handleSend = deleteMessageById.bind(null, msg_id, userId);

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
        className="sm:w-[300px] p-2 dark:bg-black/90 min-h-24"
      >
        <CardHeader>
          <CardTitle className="capitalize">{message}</CardTitle>

          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default MessageCard;
