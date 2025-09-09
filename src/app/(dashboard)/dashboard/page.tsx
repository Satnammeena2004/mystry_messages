
import MessageCard from "@/components/MessageCard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import IsAcceptingMessages from "@/components/IsAcceptingMessages";
import RefreshMessageFeed from "@/components/RefreshMessageFeed";
import ClipboardLink from "@/components/ClipboardLink";

import DeleteMessage from "@/components/DeleteMessage";
import { getMessageAction } from "@/app/actions";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    return redirect("/unauthenticated");
  }

  const messages = await getMessageAction.call(null, session?.user?._id);
  return (
    <div className="px-4 sm:px-8  ">
      <h1 className="h2 p-4 dark:text-white/80 mb-10">Dashboard</h1>
      <ClipboardLink />
      <IsAcceptingMessages />
      <RefreshMessageFeed />
      <DeleteMessage />
      <div className=" p-4 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-3 md:gap-x-10 ">
        {(messages?.length === 0 || messages?.length === undefined) && (
          <div className="col-span-full">
            <p className="text-center text-gray-500">No messages yet</p>
          </div>
        )}
        {messages?.map(
          ({ content, _id }: { content: string; _id: string }, i: number) => {
            return (
              <MessageCard
                key={i}
                msg_id={_id?.toString()}
                userId={session?.user?._id?.toString()}
                message={content}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
