import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import dbConnect from "./dbConnection";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  trustHost:true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        email: {},
        password: {},
      },

      authorize: async (credentials: any) => {
        try {
     
          await dbConnect();
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.username },
            ],
          });
      
          if (!user) {
            return null;
            // throw new Error("You are not verified so do it first");
            // throw new Error("user not found with this email or username");
          }

          console.log("userpassword", credentials);
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
      

          if (!isCorrectPassword) {
            return null;
          }
          // if (!user.isVerified) {

          //   return null;
          // }

          return user;
        } catch (err: any) {
          console.log("Error in catch sign-p", err);
          return null;
        }
      },
    }),
    google,
    github
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("user,account",user,account)
      if (account?.provider == "google" || account?.provider == "github") {
        await dbConnect();
        const userFromDB = await UserModel.findOne({
          $or: [{ email: user.email }, { username: user.name }],
        });
        console.log("userIndDB", userFromDB);
        if (userFromDB) {
          user._id = userFromDB._id;
          user.isAcceptsMessage = userFromDB.isAcceptsMessage;
          user.isVerified = userFromDB.isVerified;
          user.username = userFromDB.username;

          return true;
        }
        const newUser = new UserModel({
          username: user.name,
          email: user.email,
          password: "nopassword",
          verifyCode: "google",
          verifyCodeExpiry: new Date(),
          isVerified: true,
          isAcceptsMessage: false,
          messages: [],
        });
        user._id = newUser._id;
        user.isAcceptsMessage = false;
        user.isVerified = true;
        user.username = newUser.username;
        console.log("newUser", newUser);
        await newUser.save();
        return true;
      }

      return true;
    },

    async jwt({ token, user, trigger, session, account }) {
      // console.log("reached",account);
      // console.log({ token, user, trigger, session });
      if (user) {
        token._id = user._id;
        token.isAcceptsMessage = user.isAcceptsMessage;
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.verifyCodeExpiry = user.verifyCodeExpiry;
      }
      if (trigger === "update") {
        token.isVerified = true;
        return { ...token, ...session.data.user };
      }

      return token;
    },
    async session({ session, token, trigger }) {
      // console.log("reached session");
      session.user._id = token._id;
      session.user.isAcceptsMessage = token.isAcceptsMessage;
      session.user.verifyCodeExpiry = token.verifyCodeExpiry;
      session.user.isVerified = token.isVerified;
      session.user.username = token.username;
      if (trigger === "update") {
        return { ...session, user: { ...token } };
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
});
