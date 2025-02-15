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
import { Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { getSession } from "@/helpers/getSession";
import { useRouter } from "next/navigation";
import PasswordToggle from "@/components/PasswordToggle";

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
console.log(form.formState.isLoading)
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
      });

      // if (result?.error === undefined) {
      //   toast({
      //     title: "Login succesfull",
      //     description: "great finally yor are logged in",
      //     variant: "success",
      //   });
      // }
      if (result?.error == "CredentialsSignin") {
        toast({
          title: "Login failed",
          description: "Your email/usernamae or passowrd is incorrect",
          variant: "destructive",
        });
        const configErrors:{name:string,type:string,message:string}[] = [
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
    <div className="bg-slate-300 min-h-screen flex justify-center ">
      <div className="max-w-[25rem] w-4/5 h-5/6 mt-4 bg-slate-50 rounded-lg border shadow-md px-8 py-8">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-center">
            Join Mystry Message
          </h1>
          <p className="text-sm text-center ">
            Sign up to start anonymous journy
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      {...field}
                    />
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

            <Button disabled={disabled} className="flex my-4 items-center" type="submit">
              {!disabled? (
                "Sign in"
              ) : (
                <>
                <span>
                  <Loader2 className="animate-spin" /> 
                </span>
                <span>Signing</span>
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="my-1  text-sm flex">
          <p className="mx-auto">
            Dont have an account{" "}
            <Link href="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex my-4">
          <Button
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            className="bg-green-300 m-auto md:w-2/3 w-fit  text-black hover:bg-green-400"
          >
            <Mail /> Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
