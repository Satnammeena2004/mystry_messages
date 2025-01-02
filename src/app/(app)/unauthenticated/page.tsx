"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";

function Page() {
  //   const [countdown, setCountdown] = useState(4);

  //   if (countdown === 0) {
  //     redirect("/sign-in");
  //   }

  //   useEffect(() => {
  //     let timer;
  //     if (countdown > 0) {
  //       timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
  //     }

  //     return () => clearTimeout(timer);
  //   }, [countdown]);
  const session = useSession();
  if (session.data) {
    return redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-fit flex flex-col justify-center items-center gap-2   py-20">
        <h1 className="text-4xl font-semibold text-center md:text-justify">
          You Are Not <span className="text-red-600 whitespace-nowrap">Authenticated !</span>
        </h1>
        <p>Please login or sign up first</p>
        <Button className="mt-8 " onClick={() => redirect("/sign-in")}>
          click for /sign-in{" "}
          {/* <span className="text-blue-600">0s</span> */}
        </Button>
      </div>
    </div>
  );
}

export default Page;
