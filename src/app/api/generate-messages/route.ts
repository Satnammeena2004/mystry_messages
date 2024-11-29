import { auth } from "@/lib/auth";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

export const GET = auth(async function GET(request) {
  const session = request.auth;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        messages: "You are Not authenticated",
      },
      {
        status: 404,
      }
    );
  }
  try {
    const obj = streamObject({
      model: google("gemini-1.5-flash"),
      maxTokens: 200,
      prompt: "generate three message like this that follow that schema",
      schema: z
        .object({
          message: z
            .string()
            .describe(
              "You generate random messages open ended and  engaging question  a single string these question are anonymous messaging plateform like qooh.com. and should be suitable for diverse audience avoid personal and sensitive topics focusing universal themes that encourge friendly interaction"
            ),
        })
        .array()
        .max(3),
    });

    return obj.toTextStreamResponse();
  } catch (error) {
    console.log("error in gangerating messages", error);

    return Response.json(
      {
        success: false,
        messages: "error in gangerating messages",
      },
      {
        status: 500,
      }
    );
  }
});
