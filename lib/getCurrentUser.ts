// lib/getCurrentUser.ts

import { auth } from "@/auth";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  const user = await User.findOne({
    email: session.user.email,
    status: "active",
  })
    .select("_id displayName publicId email name")
    .lean();

  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    displayName: user.displayName,
    publicId: user.publicId,
    email: user.email,
    name: user.name,
  };
}