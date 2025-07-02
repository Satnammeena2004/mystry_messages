"use client";

import { useEffect, useState } from "react";

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

const Slide = () => {
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
  return <p className="">{thumbnailTexts[index]}</p>;
};

export default Slide;
