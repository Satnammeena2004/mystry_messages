"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        className="sm:w-[300px] p-2 dark:bg-black/90 min-h-24"
      >
        <CardHeader>
          <CardTitle className="capitalize">{message}</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default MessageCard;
