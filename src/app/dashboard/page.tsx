/* eslint-disable @typescript-eslint/ban-ts-comment */
import MessageCard from "@/components/MessageCard";
import { auth} from "@/lib/auth";
import { BASE_URL } from "../../helpers/constant";
import { redirect } from "next/navigation";
import IsAcceptingMessages from "@/components/IsAcceptingMessages";
import RefreshMessageFeed from "@/components/RefreshMessageFeed";
import ClipboardLink from "./ClipboardLink";
import axios from "axios";
import { ApiResponseType } from "@/types/ApiResponse";
import { MessageType } from "@/models/User";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    return redirect("/unauthenticated");
  }
   


  if (!session.user.isVerified) {
    return redirect("/verification");
  }
  const getMessages = async (
    userId: string | undefined
  ): Promise<MessageType[] | undefined> => {
    try {
      const { data } = await axios.get<ApiResponseType>(
        BASE_URL + "/api/get-messages?userId=" + userId
      );
      return data.messages;
    } catch (error) {
      console.log("Error in get messages", error);
      return;
    }
  };
  const messages = await getMessages.bind(null, session?.user?._id)();

  return (
    <div className="px-4 sm:px-8  ">
      <h1 className="h2 p-4">User Dashboard</h1>
      <ClipboardLink />
      <IsAcceptingMessages />
      <RefreshMessageFeed />

      <div className="flex p-4  gap-3 flex-wrap">
        {messages?.map(({ content, _id }, i) => {
          return (
            <MessageCard
              key={i}
              msg_id={_id}
              userId={session?.user?._id}
              message={content}
            />
          );
        })}
      </div>
    </div>
  );
}
