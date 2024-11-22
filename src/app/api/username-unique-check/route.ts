// import dbConnect from "@/lib/dbConnection";
// import UserModel from "@/models/User";
import { z } from "zod";
import dbConnect from "@/lib/dbConnection";
import { UserNameSchema_ZOD } from "@/schemas/signupSchema";
import UserModel from "@/models/User";
import { auth } from "@/lib/auth";

const usernameValidationSchema = z.object({
  username: UserNameSchema_ZOD,
});

export const GET = auth( async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.nextUrl);
    const queryParams = {
      username: searchParams.get("username"),
    };

    const result = usernameValidationSchema.safeParse(queryParams);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: result.error?.format().username?._errors,
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    console.log("username", username);
    const existingUserwithUsername = await UserModel.findOne({
      username: username,
      isVerified: true,
    });
    if (existingUserwithUsername) {
      return Response.json(
        {
          success: false,
          message: "username is already taken ",
        },
        { status: 405 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error in checking username",
      },
      {
        status: 500,
      }
    );
  }
})
