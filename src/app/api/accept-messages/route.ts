import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";

export const POST = auth(async function POST(request) {
  const session = request.auth;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        messages: "Ypu are Not aunthenticated",
      },
      {
        status: 404,
      }
    );
  }
  try {
    await dbConnect();
    const userId = session.user._id;
    const { acceptMeesages } = await request.json();

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptsMessage: acceptMeesages,
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: true,
          messages: "failed to update accept-messages",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        messages: "messages status accept succesfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("failed to update accept-messages", error);
    return Response.json(
      {
        success: false,
        messages: "failed to update accept-messages",
      },
      {
        status: 500,
      }
    );
  }
});

export const GET = auth(async function GET(request) {
  const session = request.auth;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        messages: "Ypu are Not aunthenticated",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const userId = session.user._id;
    await dbConnect();
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          messages: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        isAccetingMessages: foundUser.isAcceptsMessage,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in update accept messages", error);
    return Response.json(
      {
        success: false,
        messages: "Error in getting status of accepting messages",
      },
      {
        status: 500,
      }
    );
  }
});
