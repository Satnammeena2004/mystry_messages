"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { acceptsMessageSchema } from "@/schemas/acceptMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { useSession } from "next-auth/react";

function IsAcceptingMessages() {
  const session = useSession();
  const { register, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(acceptsMessageSchema),
  });

  const initialCheckAcceptsMessage = useCallback(
    async function () {
      const { data } = await axios.get(location.origin + "/api/accept-messages");
      console.log("rendering initialAccept message");
      setValue("acceptsMessage", data.isAcceptingMessages);
      toast({
        title: "User accepts messages",
        description: "You can receive anonymous messages",
        variant: "success",
      });
      return data.isAcceptingMessages;
    },
    [setValue]
  );

  const acceptsMessageValue = watch("acceptsMessage");
  function handleChange() {
    setValue("acceptsMessage", !acceptsMessageValue);
  }
  async function onSubmit(data: z.infer<typeof acceptsMessageSchema>) {
    await axios.post(location.origin + "/api/accept-messages", data).then(() => {
      toast({
        title: "successfully changed saved",
        description: "Your accepting message changed",
        variant: "primary",
      });
    });
    session
      .update({
        ...session,
        data: {
          ...session?.data,
          user: {
            ...session?.data?.user,
            isAcceptsMessage: data.acceptsMessage,
          },
        },
      })
      .catch((err) => {
        console.log("Error in changing the accept message", err);
        toast({
          title: "Error in  accept message",
          description: "Error in changing the accept message",
          variant: "destructive",
        });
        setValue("acceptsMessage", !acceptsMessageValue);
      });
  }
  useEffect(() => {
    async function getAsync() {
      await initialCheckAcceptsMessage().catch((err) => {
        console.log("Error in checking user accepts messages", err);
        toast({
          title: "Error Accepts message",
          description: "Error in checking user accepts messages",
          variant: "destructive",
        });
      });
    }
    getAsync().catch((err) => {
      toast({
        title: "Something went wrong ?",
        description: "Error in checking accepts messages",
        variant: "destructive",
      });
      console.log(err);
    });
  }, [initialCheckAcceptsMessage]);
  return (
    <div className="my-8 md:px-8 px-4">
      <div className="flex items-center space-x-2">
        <form
          className="flex items-center gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Switch
            type="submit"
            checked={acceptsMessageValue}
            {...register("acceptsMessage")}
            id="airplane-mode"
            name="acceptsMessage"
            onCheckedChange={handleChange}
          />
          <Label htmlFor="airplane-mode">
            Accept Message : {acceptsMessageValue ? "on" : "off"}
          </Label>
        </form>
      </div>
    </div>
  );
}

export default IsAcceptingMessages;
