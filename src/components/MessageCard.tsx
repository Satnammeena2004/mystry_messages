"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { deleteMessageById } from "@/app/actions";
import axios from "axios";
import { ApiResponseType } from "@/types/ApiResponse";
import { BASE_URL } from "@/helpers/constant";
import { toast } from "@/hooks/use-toast";

type MessageCardProps = {
  message: string;
  msg_id: string;
  userId: string;
};

function MessageCard({ message, msg_id, userId }: MessageCardProps) {
  const handleSend = deleteMessageById.bind(null, msg_id, userId);

  return (
    <div>
      <Card className="sm:w-[300px] p-2">
        <CardHeader>
          <CardTitle className="uppercase">{message}</CardTitle>

          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent></CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-600" variant="outline">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600"
                onClick={async () => {
                  const resp = await axios.post<ApiResponseType>(
                    BASE_URL +
                      "/api/delete-message/" +
                      msg_id +
                      "?userId=" +
                      userId
                  );
                  if (resp.data.success) {
                    handleSend();
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
      </Card>
    </div>
  );
}

export default MessageCard;
