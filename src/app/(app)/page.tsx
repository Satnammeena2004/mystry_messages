import MessageBox from "@/components/MessageBox";
import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div

      className="relative  bg-cover bg-center  font-[family-name:var(--font-geist-sans)] flex justify-center items-center  h-full   "
    >
      <div className="mx-auto h-full w-80 sm:w-2/4 ">
        <h1 className="h1 px-4 lg:px-12 w-fit mx-auto font-bold uppercase mt-6 origin-center ">
          Send{" "}
          <span className="text-black shadow-md  bg-white p-2 skew-y-6 ">
            anonymous
          </span>{" "}
          messages to <span className="text-cyan-50 bg-black p-2 ">ANYONE</span>
        </h1>
        <div className="p-1  border rounded-full lg:w-3/4 mx-auto  text-center mt-8 lg:mt-12 w-full overflow-hidden">
          <Slide />
        </div>
        <div className="flex justify-center mt-8 lg:mt-10">
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
      <MessageBox className="left-10 top-30 hidden lg:block " />
      <MessageBox className="right-40 top-60 hidden lg:block " />
    </div>
  );
}
