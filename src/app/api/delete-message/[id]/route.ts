import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";

export const DELETE = auth(async function DELETE(request, { params }) {
  try {
    const { id: messageId } = await params;
    const { searchParams } = new URL(request.nextUrl);

    const _id = searchParams.get("userId");

    // if (!request.auth || !user) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: "You are not authorized",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }
    await dbConnect();
    await UserModel.updateOne(
      { _id },
      { $pull: { messages: { _id: messageId } } }
    );

    return Response.json(
      {
        success: true,
        message: "message delete successful",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in deletion of message", error);
    return Response.json(
      {
        success: false,
        message: "Error while deletion of message",
      },
      {
        status: 500,
      }
    );
  }
});
