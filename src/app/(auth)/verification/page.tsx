"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ApiResponseType } from "@/types/ApiResponse";

function Page() {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  console.log(session);

  if (session.status === "unauthenticated") {
    return router.replace("/sign-in");
  }
  if (session.status === "loading") {
    return <Loader2 className="animate-spin" />;
  }
  const isVerified = session.data?.user.isVerified;
  const email = session.data?.user.email as string;
  const username = session.data?.user.username as string;

  if (isVerified) {
    return router.replace("/dashboard");
  }
  async function handleSendEmailForVerificationCode() {
    setIsLoading(true);
    try {
      const res = await axios.get<ApiResponseType>(
        "/api/send-verification-email"
      );

      toast({
        title: "verification code sent",
        variant: "success",
        description: res.data.message,
      });
router.replace("/verify/" + username)
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "something went wrong",
          variant: "destructive",
          description: err.response?.data.message,
        });
      }
      toast({
        title: "something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-2 h-full">
      <div className="mt-28">
        <h1 className="text-2xl w-fit mx-auto font-bold mb-4">Verify Your Account First</h1>
        <div className="mx-auto  w-72 p-4 border rounded-md flex flex-col gap-4 shadow-md bg-stone-50">
          <Input type="email" value={email} disabled placeholder="@gmail.com" />
          <Button
            onClick={handleSendEmailForVerificationCode}
            disabled={isLoading}
            className="flex"
          >
            {isLoading && <Loader2 className="animate-spin items-center" />}
            <span>Send Code</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
