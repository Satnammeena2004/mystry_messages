import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export const GET = auth(async function GET(req) {
//   const user: User = req.auth?.user;

//   console.log("Userssssss", user);
//   await dbConnect();
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
