import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    username?: string;
    email?: string;
    password?: string;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    isVerified?: boolean;
    isAcceptsMessage?: boolean;
  }

  interface Session {
    user: {
      _id?: string;
      verifyCode?: string;
      verifyCodeExpiry?: Date;
      isVerified: boolean;
      isAcceptsMessage?: boolean;
    } & DefaultSession["user"];
  }
}
