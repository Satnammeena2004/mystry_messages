import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import dbConnect from "./dbConnection";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        email: {},
        password: {},
      },

      authorize: async (credentials: any) => {
        try {
          console.log("credentoalt", credentials);
          await dbConnect();
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.username },
            ],
          });
          console.log(
            "---------------------------------------------------------",
            user
          );
          if (!user) {
            return null;
            // throw new Error("user not found with this email or username");
          }
          if (!user.isVerified) {
            return null;
            throw new Error("You are not verified so do it first");
          }
          console.log("userpassword", credentials);
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log("isCorrectPassword", isCorrectPassword);

          if (!isCorrectPassword) {
            return null;
          }
          if (!user.isVerified) {
            return null;
          }

          return user;
        } catch (err: any) {
          console.log("Error in catch sign-p", err);
          return null;
        }
      },
    }),
    google,
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isAcceptsMessage = user.isAcceptsMessage;
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      // console.log("token", token);
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.isAcceptsMessage = token.isAcceptsMessage;
      session.user.isVerified = token.isVerified;
      session.user.username = token.username;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/dashboard";
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
});
