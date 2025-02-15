"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

function MessageBox({ className }: { className: string }) {
  return (
    <div
      className={`${className} absolute  p-2 box-border z-10 text-white text-sm `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        viewBox="0 0 24 24"
        fill="bg-gradient-to-r from-slate-900 to-slate-700"
        stroke="currentColor"
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide -z-20 lucide-message-square absolute -top-3/4 -left-[12%]"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </div>
  );
}

const thumbnailTexts = [
  "Where Curiosity Meets Anonymity ✨ Ask Freely, Answer Honestly!",
  "Unlock the Mystery! 🌟 Ask Anything, Anonymously.",
  "Questions Without Limits 🔥 Explore Anonymous Insights!",
  "Who Said That? 🤔 Anonymous Messages, Endless Fun!",
  "Speak Your Mind 🎭 No Names, No Judgment!",
  "Your Secrets, Their Replies ✨ Ask Anything Anonymously!",
  "Whisper Your Thoughts 🕵️‍♀️ Anonymous Q&A Awaits!",
  "Discover Hidden Truths 🔎 The Mystery Begins Here!",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (index >= thumbnailTexts.length - 1) {
        setIndex(0);
        return;
      }
      setIndex((i) => i + 1);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);
  return (
    <div
      style={{}}
      className="relative font-[family-name:var(--font-geist-sans)] flex justify-center items-center  h-full bg-grid-pattern"
    >
      <div className="mx-auto h-full w-80 sm:w-2/4 ">
        <h1 className="h1 px-4 lg:px-12 w-fit mx-auto font-bold uppercase mt-10 origin-center ">
          Send{" "}
          <span className="text-black shadow-md  bg-white p-2 skew-y-6 ">
            anonymous
          </span>{" "}
          messages to <span className="text-cyan-50 bg-black p-2 ">ANYONE</span>
        </h1>
        <div className="p-1  border rounded-full lg:w-3/4 mx-auto  text-center mt-8 lg:mt-12 w-full overflow-hidden">
          <p className="">{thumbnailTexts[index]}</p>
        </div>
        <div className="flex justify-center mt-8 lg:mt-12">
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
      <MessageBox className="left-10 top-30 hidden lg:block" />
      <MessageBox className="right-40 top-60 hidden lg:block" />
    </div>
  );
}
