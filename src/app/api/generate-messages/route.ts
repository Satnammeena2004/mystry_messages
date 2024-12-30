import { auth } from "@/lib/auth";
import { GenerateMessageSchema } from "@/schemas/generateMessageSchema";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 30;

export const POST = auth(async function POST(request) {
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
      schema: GenerateMessageSchema,
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
