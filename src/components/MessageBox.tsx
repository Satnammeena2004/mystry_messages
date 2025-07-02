"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function MessageBox({ className }: { className: string }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a completely static version for server-side rendering
  if (!mounted) {
    return (
      <div
        className={`${className} absolute animate-in fade-in-40 fade-out-80 p-2 box-border z-10 text-sm`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          viewBox="0 0 24 24"
          fill="black"
          stroke="black"
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide -z-20 lucide-message-square absolute -top-3/4 -left-[12%"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      className={`${className} absolute animate-in fade-in-40 fade-out-80 p-2 box-border z-10 text-sm`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        viewBox="0 0 24 24"
        fill={currentTheme === "dark" ? "hsl(222, 100%, 97%)" : "black"}
        stroke={currentTheme === "dark" ? "hsl(222, 100%, 97%)" : "black"}
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide -z-20 lucide-message-square absolute -top-3/4 -left-[12%"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </div>
  );
}

export default MessageBox;
