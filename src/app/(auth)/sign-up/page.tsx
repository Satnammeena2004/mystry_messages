"use client";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema_ZOD } from "@/schemas/signupSchema";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponseType } from "@/types/ApiResponse";

import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/helpers/getSession";
import { signIn } from "next-auth/react";
import PasswordToggle from "@/components/PasswordToggle";
import Intro from "@/app/components/Intro";
type FormStatus = "idle" | "pending" | "submited";

function Page() {
  const router = useRouter();

 
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState<string | string[]>("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const debounced = useDebounceCallback(setUsername, 500);
  const form = useForm<z.infer<typeof SignUpSchema_ZOD>>({
    resolver: zodResolver(SignUpSchema_ZOD),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    async function getS() {
      const session = await getSession();
      if (session !== null) {
        router.push("/");
      }
    }
    getS();
  }, [router]);

  const onSubmit = async (data: z.infer<typeof SignUpSchema_ZOD>) => {
    try {
      setFormStatus("pending");
      const response = await axios.post("/api/sign-up", data);
      toast({
        title: "Signup successfully",
        description: response.data?.message,
      });
     
      setFormStatus("submited");
      setTimeout(() => {
        router.replace("/sign-in");
      }, 0);
    } catch (error) {
      const apiError = error as AxiosError<ApiResponseType>;
      console.log(apiError);
      const errorMessage = apiError.response?.data.message;
      setFormStatus("idle");
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    console.log("username", username);
    if (username) {
      async function checkUserName() {
        setCheckingUsername(true);
        try {
          const isUnique = await axios.get<ApiResponseType>(
            "/api/username-unique-check?username=" + username
          );
          setUsernameMessage(isUnique.data.message);
          // setCheckingUsername(false)
          console.log(isUnique);
        } catch (error) {
          const apiError = error as AxiosError<ApiResponseType>;

          setUsernameMessage(
            apiError.response?.data.message ?? "error in username checking"
          );
        } finally {
        }
      }
      checkUserName();
    }
  }, [username]);

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center bg-grid-pattern14 dark:bg-grid-pattern2 bg-cover bg-center">
      <div className="max-w-[25rem] w-4/5 bg-slate-50 dark:bg-black/90  rounded-xl border shadow-md px-8 pt-4 mt-4 h-fit">
       <Intro/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        debounced(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>

                  {checkingUsername && (
                    <p
                      className={`flex items-center gap-2 ${
                        usernameMessage == "username is unique"
                          ? "text-green-500"
                          : "text-red-500 text-sm"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={`${isEyeOpen ? "text" : "password"}`}
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <PasswordToggle
                    isEyeOpen={isEyeOpen}
                    setIsEyeOpen={setIsEyeOpen}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mx-auto my-4"
              type="submit"
              disabled={formStatus == "pending"}
            >
              {formStatus == "pending" ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  submiting{" "}
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>
        <div className="my-1  text-sm flex">
          <p className="mx-auto">
            Already a member{" "}
            <Link href="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex my-4 gap-x-8">
          <Button
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            className="text-white m-auto md:w-2/3 w-fit dark:hover:bg-green-400  dark:text-black hover:bg-green-400"
          >
            <Mail />
          </Button>
          <Button
            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
            className="dark:bg-white dark:text-black dark:hover:bg-green-400 m-auto md:w-2/3 w-fit  text-white hover:bg-green-400"
          >
            <Github />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
