import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    const { username, code } = await request.json();

    const user = await UserModel.findOne({ username });

    if (user && user?.isVerified) {
      return Response.json(
        {
          success: true,
          message: "user already verified",
        },
        {
          status: 200,
        }
      );
    }
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found ",
        },
        {
          status: 400,
        }
      );
    }

    const isCodeValid = code == user.verifyCode;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "account is successfully verified",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "code is not valid",
        },
        {
          status: 400,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verificationm code is expired",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log("error in verification code", error);
    return Response.json(
      {
        success: false,
        message: "Error in verification code",
      },
      {
        status: 500,
      }
    );
  }
}
