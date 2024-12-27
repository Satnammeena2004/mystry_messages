import { z } from "zod";

export const GenerateMessageSchema = z
  .object({
    message: z
      .string()
      .describe(
        "You generate random messages open ended and  engaging question  a single string these question are anonymous messaging plateform like qooh.com. and should be suitable for diverse audience avoid personal and sensitive topics focusing universal themes that encourge friendly interaction"
      ),
  })
  .array()
  .max(3);

// define a schema for the notifications
export const generatedMessageSchema = z.object({
  messages: z
    .array(
      z.object({
        message: z
          .string()
          .describe(
            "You generate random messages open ended and  engaging question  a single string these question are anonymous messaging plateform like qooh.com. and should be suitable for diverse audience avoid personal and sensitive topics focusing universal themes that encourge friendly interaction"
          ),
      })
    )
    .max(3),
});
