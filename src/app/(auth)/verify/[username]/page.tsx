"use client";

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

import { useParams, useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

function Verify() {
  const router = useRouter();
  const { username } = useParams<{ username: string }>();
  const [disabled, setDisabled] = useState(false);
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    disabled,
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      console.log(data);
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
      setTimeout(() => {
        router.replace("/api/auth/signin");
      }, 300);
    } catch (error) {
      console.log("APE Error in code verification");
      const apiError = error as AxiosError<ApiResponseType>;
      console.log(apiError);

      toast({
        title: "Code verification failed",
        description: apiError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };
  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <div className="max-w-[25rem] flex justify-center items-center w-4/5 bg-slate-50 rounded-lg border shadow-md px-8 py-8">
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
            <Button disabled={disabled} className="my-3 mx-auto" type="submit">
              {disabled ? "Sending..." : "Send"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Verify;
