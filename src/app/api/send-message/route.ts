import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { username, content } = await request.json();

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          messages: "user not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!user.isAcceptsMessage) {
      return Response.json(
        {
          success: false,
          messages: "User not accepting messags right now",
        },
        {
          status: 403,
        }
      );
    }

    const newMsg = { content, createdAt: new Date() };

    user.messages.push(newMsg);
    await user.save();
    return Response.json(
      {
        success: true,
        messages: "message sent succesfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("unexpected error in send messages", error);

    return Response.json(
      {
        success: false,
        messages: "unexpected error in send messages",
      },
      {
        status: 500,
      }
    );
  }
}
