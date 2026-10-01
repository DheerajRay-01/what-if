import { NextRequest } from "next/server";

import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import User from "@/models/user.model";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;

    if (!publicId) {
      return ApiResponse(false, 400, null, "Public ID is required");
    }

    await connectDB();

    const user = await User.findOne({
      publicId: publicId.toUpperCase(),
      status: "active",
    }).select("_id displayName publicId");

    if (!user) {
      return ApiResponse(false, 404, null, "User not found");
    }


    return ApiResponse(
      true,
      200,
      {
        displayName: user.displayName,
        publicId: user.publicId,
      },
      "User profile fetched successfully"
    );
  } catch (error) {
    console.error("Get public user error:", error);

    return ApiResponse(
      false,
      500,
      null,
      "Failed to fetch user profile"
    );
  }
}