"use client";
import { formatTime } from "@/helpers/heplper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifyShema";
import { ApiResponseType } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCountdown } from "usehooks-ts";
import * as z from "zod";
function Verify() {
  const router = useRouter();
  const session = useSession();
  const [expired, setExpired] = useState<number>(120);
  const { username } = useParams<{ username: string }>();
  const [disabled, setDisabled] = useState(false);
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    disabled,
  });
  const s = useRef<number>(180);

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: s.current,
      intervalMs: 1000,
      countStop: 0,
    });
  if (count <= 0) {
    toast({
      title: "Code expired",
      description: "Please request a new code",
      variant: "destructive",
    });
  }

  useEffect(() => {
    if (session.status === "loading") {
      return;
    }
    const e = session.data?.user.verifyCodeExpiry as Date;
    const seconds = Math.abs((new Date(e).getTime() - Date.now()) / 1000);
    s.current = Math.abs(seconds);
    if (s.current != seconds) {
      startCountdown();
    }

    return () => {
      stopCountdown();
    };
  }, [
    startCountdown,
    stopCountdown,
    session.status,
    session.data?.user.verifyCodeExpiry
  ]);

  if (session.status === "loading") {
    return;
  }
  if (session.data?.user.isVerified) {
    return router.replace("/dashboard");
  }
  // console.log(session.data?.user);
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      // console.log(data);
      setDisabled(true);
      const response = await axios.post("/api/verify-code", {
        ...data,
        username,
      });
      toast({
        title: response.data.message.toUpperCase(),
        description: "Code Verification Successfully",
        variant: "success",
      });

      stopCountdown();

      session.update({
        ...session,
        data: {
          ...session?.data,
          user: {
            ...session?.data?.user,
            isVerified: true,
          },
        },
      });

      setTimeout(() => {
        router.replace("/dashboard");
      }, 200);
    } catch (error) {
      console.log("APE Error in code verification");
      const apiError = error as AxiosError<ApiResponseType>;
      console.log(apiError);
      // session.data?.user.isVerified = true;
      await session.update((prev) => ({
        ...prev,
        data: { ...prev.data, user: { ...prev.data?.user, isVerified: true } },
      }));
      toast({
        title: "Code verification failed",
        description: apiError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };
  if (session.status === "loading") {
    return;
  }
  if (session.status === "unauthenticated") {
    router.push("/unauthenticated");
    return;
  }
  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <div className="max-w-[25rem] flex justify-center items-center w-4/5 bg-slate-50 rounded-lg border shadow-md px-8 py-8 relative">
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-center w-full">
                    Verify Your Code{" "}
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={2} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {count <= 0 ? (
              <>
                <Button
                  className="my-3 mx-auto"
                  onClick={async () => {
                    try {
                      resetCountdown();
                      startCountdown();
                      await axios.get("/api/send-verification-email");
                      toast({
                        title: "Code resent",
                        description: "Please check your email",
                        variant: "success",
                      });
                    } catch (error) {
                      console.log("Error in resending code", error);
                      toast({
                        title: "Error in resending code",
                        description: "Please try again",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Resend Code
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled={disabled}
                  className="my-3 mx-auto"
                  type="submit"
                >
                  {disabled ? "Sending..." : "Send "}
                </Button>
                <p className="absolute bottom-0 right-2 text-sm">
                  Code expires in
                  {}
                  <span className="text-blue-600 ml-3">
                    {formatTime(count)}s
                  </span>
                </p>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Verify;
