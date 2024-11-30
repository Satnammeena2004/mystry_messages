
import { SignIn } from "../components/auth/signin-button";
import { SignOut } from "../components/auth/signout-button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = auth();
  
  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello next JS {JSON.stringify(session)} </h1>
      <SignIn></SignIn>
      <SignOut />
    </div>
  );
}
