import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export const GET = auth(async (request) => {
  // const session = await auth(req, res);

  // const session = request.auth;

  // if (!session || !session.user) {
  //   return Response.json(
  //     {
  //       success: false,
  //       messages: "You are Not authenticated",
  //     },
  //     {
  //       status: 400,
  //     }
  //   );
  // }

  try {
    const { searchParams } = new URL(request.nextUrl);

    const _id = searchParams.get("userId");
    console.log("id==================================", _id);
    await dbConnect();
    const userId = new mongoose.Types.ObjectId(_id);

    const messages = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!messages || messages.length === 0) {
      return Response.json(
        {
          success: false,
          messages: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: messages[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in send messages", error);
    return Response.json(
      {
        success: false,
        messages: "Error in send Messages",
      },
      { status: 500 }
    );
  }
});
