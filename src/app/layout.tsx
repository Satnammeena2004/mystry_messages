import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

import ThemeProvider from "@/components/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  openGraph: {
    title: process.env.APP_NAME,
    description:
      "Hello , It a sass web app that you can send anonymous messages to anyone",
    url: process.env.BASE_URL,
    siteName: process.env.APP_NAME,
    type: "website",
    images: [
      {
        url: process.env.BASE_URL + "/homepage.png",
        secureUrl: process.env.BASE_URL + "/homepage.png",
        width: 1200,
        height: 630,
        alt: "Preview image for " + process.env.APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mystrymessages",
    title: process.env.APP_NAME,
    description:
      "Hello , It a sass web app that you can send anonymous messages to anyone",
    creator: "@satnam",
    images: {
      url: process.env.BASE_URL + "/logo.jpg",
      alt: "Preview image for " + process.env.APP_NAME,
    },
  },

  title: "Anonify",
  description: "You can send anonymous messages to anyone",
  authors: [{ name: "Satnam Meena", url: process.env.BASE_URL }],
  applicationName: process.env.APP_NAME,
  keywords: [
    "mystry",
    "messages",
    "satnam",
    "satnammeena",
    "message",
    "send",
    "user",
    "nextjs",
    "",
  ],
  creator: "Satnam Meena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}   ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <div className="relative min-h-screen bg-grid-pattern14 dark:bg-grid-pattern2  bg-cover bg-center ">
              {children}
            </div>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
