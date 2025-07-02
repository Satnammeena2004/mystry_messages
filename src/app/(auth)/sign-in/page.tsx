"use client";

import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

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

import Link from "next/link";
import { signInSchema } from "@/schemas/signinSchema";
import { signIn } from "next-auth/react";
import { Github, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { getSession } from "@/helpers/getSession";
import { useRouter } from "next/navigation";
import PasswordToggle from "@/components/PasswordToggle";
import Image from "next/image";
import Logo from "@/../public/logo.jpg";

function Page() {
  const router = useRouter();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      indentifier: "",
      password: "",
    },
    disabled,
  });
  console.log(form.formState.isLoading);
  useEffect(() => {
    async function getS() {
      const session = await getSession();
      if (session !== null) {
        router.push("/");
      }
    }
    getS();
  }, [router]);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setDisabled(true);
      const result = await signIn("credentials", {
        email: data.indentifier,
        username: data.indentifier,
        password: data.password,
        redirect: false,
      });
      console.log("result form signin page", result);
      if (result?.ok && result.error === null) {
        toast({
          title: "Login succesfull",
          description: "great finally yor are logged in",
          variant: "success",
        });
        router.replace("/dashboard");
        return;
      }

      if (result?.error == "CredentialsSignin") {
        toast({
          title: "Login failed",
          description: "Your email/usernamae or passowrd is incorrect",
          variant: "destructive",
        });
        const configErrors: {
          name: "indentifier" | "password";
          type: string;
          message: string;
        }[] = [
          {
            name: "indentifier",
            type: "manual",
            message: "Incorrect indentifier",
          },
          { name: "password", type: "manual", message: "Incorrect password" },
        ];
        configErrors.forEach(({ name, type, message }) => {
          form.setError(name, {
            type: type,
            message: message,
          });
        });
      }
    } catch (error) {
      toast({
        title: "Something wrong",
        description: "Plase reenter your credentials",
        variant: "destructive",
      });
      form.clearErrors();
      console.log("error", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="bg-slate-300  min-h-screen flex justify-center bg-grid-pattern14 dark:bg-grid-pattern2 bg-cover bg-center">
      <div className="max-w-[25rem] w-4/5 h-5/6 mt-4 bg-slate-50 dark:bg-black/90    rounded-xl  border  px-8 py-8">
        <Image
          src={Logo}
          width={100}
          className="mb-2 -mt-4 mx-auto rounded-lg"
          height={100}
          alt="logo"
        />
        <div className="mb-4 dark:text-white">
          <h1 className="text-3xl font-semibold text-center ">
            Join Mystry Message
          </h1>
          <p className="text-sm text-center dark:text-white">
            Sign up to start anonymous journy
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="dark:*:text-white"
          >
            <FormField
              control={form.control}
              name="indentifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email/username</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="email/username"
                      className="dark:text-white"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="dark:text-red-600" />
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
                      className="dark:text-white"
                      {...field}
                    />
                  </FormControl>
                  <PasswordToggle
                    isEyeOpen={isEyeOpen}
                    setIsEyeOpen={setIsEyeOpen}
                  />
                  <FormMessage className="dark:text-red-600" />
                </FormItem>
              )}
            />

            <Button
              disabled={disabled}
              className="flex my-4 items-center dark:bg-white dark:text-black"
              type="submit"
            >
              {!disabled ? (
                <span className="dark:text-black">Sign in</span>
              ) : (
                <>
                  <span>
                    <Loader2 className="animate-spin" />
                  </span>
                  <span className="dark:text-black">Signing</span>
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="my-1  text-sm flex">
          <p className="mx-auto dark:text-white">
            Dont have an account{" "}
            <Link href="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex my-4 gap-x-8">
          <Button
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            className="dark:bg-white dark:text-black m-auto md:w-2/3 w-fit  text-white dark:hover:bg-green-400 hover:bg-green-400"
          >
            <Mail />
          </Button>
          <Button
            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
            className="dark:bg-white dark:text-black m-auto md:w-2/3 w-fit dark:hover:bg-green-400 text-white hover:bg-green-400"
          >
            <Github />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
