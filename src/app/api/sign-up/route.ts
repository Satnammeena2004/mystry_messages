import sendEmail from "@/helpers/send_mail";
import { signIn } from "@/lib/auth";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { SignUpSchema_ZOD } from "@/schemas/signupSchema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    console.log("username", username, password, email);
    const zodValidation = await SignUpSchema_ZOD.safeParse({
      username,
      password,
      email,
    });
    console.log("zodValidatrion", zodValidation);
    if (!zodValidation.success) {
      return Response.json(
        {
          success: false,
          message: "invalid data",
        },
        {
          status: 400,
        }
      );
    }
    await dbConnect();
    const userExistsVerifiedByName = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (userExistsVerifiedByName) {
      return Response.json(
        {
          success: false,
          message: "username is already taken",
        },
        {
          status: 400,
        }
      );
    }

    const existWithEmail = await UserModel.findOne({ email });
    console.log(existWithEmail);
    const verifyCode = Math.floor(Math.random() * 100000).toString();
    if (existWithEmail) {
      if (existWithEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "user is already with this email",
          },
          {
            status: 400,
          }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      existWithEmail.password = hashedPassword;
      existWithEmail.verifyCode = verifyCode;
      existWithEmail.verifyCodeExpiry = new Date(Date.now() + 1000 * 60 * 2);
      await existWithEmail.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyCode = Math.floor(Math.random() * 100000);
      const verifyCodeExpiry = new Date(Date.now() + 360000);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCodeExpiry,
        verifyCode,
        isVerified: false,
        isAcceptsMessage: true,
        messages: [],
      });

      await newUser.save();
    }
    // await sendEmail(username, verifyCode, email);



    return Response.json(
      {
        success: true,
        message: "user registred succesfully please verify your email",
      },
      {
        status: 201,
      }
    );
    // } else {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: "falied in send verification email ",
    //     },
    //     {
    //       status: 500,
    //     }
    //   );
    // }
  } catch (error) {
    console.error("Error in registring user", error);
    return Response.json(
      {
        success: false,
        message: "Error in registring in user",
      },
      {
        status: 500,
      }
    );
  }
}
