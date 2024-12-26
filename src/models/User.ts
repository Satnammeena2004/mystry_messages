import mongoose, { Schema, Document } from "mongoose";

export interface MessageType extends Document {
  content: string;
  createAt: Date;
}

export interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptsMessage: boolean;
  messages: MessageType[];
}

const MessageSchema: Schema<MessageType> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema: Schema<UserType> = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    // required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    // required: [true, "varify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    // required: [true, "varifyExpiry code is required"],
  },
  isVerified: { type: Boolean, default: false },
  isAcceptsMessage: { type: Boolean, default: true },
  messages: [MessageSchema],
});

const UserModel =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default UserModel;
