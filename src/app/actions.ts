"use server";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const deleteMessageById = async () => {
  revalidatePath("/api/get-messages");
  // }
};

export const getMessageAction = async (_id: string) => {
  await dbConnect();
  const userId = new mongoose.Types.ObjectId(_id);

  const messages = await UserModel.aggregate([
    { $match: { _id: userId } },
    { $unwind: "$messages" },
    { $sort: { "messages.createdAt": -1 } },
    { $group: { _id: "$_id", messages: { $push: "$messages" } } },
  ]);
  return messages[0]?.messages;
};

export const refreshMessageThread = async () => {
  revalidatePath("/api/get-messages");
};

