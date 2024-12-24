/* eslint-disable @typescript-eslint/ban-ts-comment */
import MessageCard from "@/components/MessageCard";
import { auth } from "@/lib/auth";
import { getMessages } from "../actions";
import { redirect } from "next/navigation";
import IsAcceptingMessages from "@/components/IsAcceptingMessages";
import ClipboardLink from "./ClipboardLink";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    return redirect("/sign-in");
  }
  const messages = await getMessages.bind(null, session?.user?._id)();

  return (
    <>
      <h1 className="text-4xl p-4">User Dashboard</h1>
      <ClipboardLink />
      <IsAcceptingMessages />
      <div className="flex p-4  gap-3">
        {messages?.map(({ content, _id }, i) => {
          //@ts-expect-error
          return <MessageCard key={i} msg_id={_id} message={content} />;
        })}
      </div>
    </>
  );
}
