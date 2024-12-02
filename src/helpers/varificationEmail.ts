import { resend } from "@/lib/resend";
import { ApiResponseType } from "@/types/ApiResponse";
import MystryMessageVerifyEmail from "../../emails/varificationEmail";

export async function sendVarificationEmail(
  username: string,
  verificationCode: string,
  email: string
): Promise<ApiResponseType> {
  try {
    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "satnam.meena2004@gmail.com",
    //   subject: "Mystry Message | Verification code",
    //   react: MystryMessageVerifyEmail({ username, verificationCode, email }),
    // });


    return {
        success: true,
        message: "Verification email succesfully sent",
      }
  } catch (emailError) {
    console.error("Error in verification email ", emailError);
    return {
      success: false,
      message: "Error in  send verification email",
    };
  }
}
