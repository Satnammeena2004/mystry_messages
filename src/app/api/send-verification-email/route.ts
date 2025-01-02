import { sendVarificationEmail } from "@/helpers/varificationEmail";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { NextResponse } from "next/server";

export const GET = auth(async (request) => {
  if (request.auth == null) {
    return NextResponse.json(
      { success: false, message: "unauthenticated" },
      { status: 401 }
    );
  }
  const { username, email } = request.auth.user as User;
  const verifyCodeExpiry = new Date(Date.now() + (1000 * 60 * 2));
  const verifyCode = Math.floor(10000 + Math.random() * 90000).toString();
  const emailSender = await sendVarificationEmail(
    username as string,
    verifyCode,
    email as string
  );
  if (!emailSender.success) {
    return NextResponse.json(
      { success: false, message: "failed to send email" },
      { status: 400 }
    );
  }

  console.log("newCode", verifyCode);
  await dbConnect();
  await UserModel.updateOne(
    { email },
    { $set: { verifyCode, verifyCodeExpiry } }
  );

  return NextResponse.json(
    {
      success: true,
      message: "verification email sent",
    },
    { status: 200 }
  );
});
