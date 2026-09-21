import { auth } from "@/auth";
import { connectDB } from "@/lib/connectDB";
import { generatePublicId } from "@/lib/generatePublicID";
import { ApiResponse } from "@/lib/response";
import User from "@/models/user.model";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
      return ApiResponse(false, 401, null, "Unauthorized");
    }

    await connectDB();

    const user = await User.findOne({
      email: session.user.email,
      status: "active",
    }).select("_id displayName publicId email name");

    if (!user) {
      return ApiResponse(true, 200, null, "User not found");
    }

    return ApiResponse(
      true,
      200,
      {
        id: user._id.toString(),
        displayName: user.displayName,
        publicId: user.publicId,
        email: user.email,
        name: user.name,
      },
      "User found",
    );
  } catch (error) {
    console.error("Get user error:", error);

    return ApiResponse(false, 500, null, "Failed to get user");
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
      return ApiResponse(false, 401, null, "Unauthorized");
    }

    const body = await request.json();
    const { displayName } = body;

    if (
      !displayName ||
      typeof displayName !== "string" ||
      displayName.trim().length === 0
    ) {
      return ApiResponse(false, 400, null, "Display name is required");
    }

    const trimmedDisplayName = displayName.trim();

    if (trimmedDisplayName.length > 32) {
      return ApiResponse(
        false,
        400,
        null,
        "Display name cannot exceed 32 characters",
      );
    }

    await connectDB();

    // Prevent duplicate user
    const existingUser = await User.findOne({
      email: session.user.email,
      status: "active",
    });

    if (existingUser) {
      return ApiResponse(false, 409, null, "User already exists");
    }

    const publicId = generatePublicId();

    const user = await User.create({
      authUserId: session.user.id,
      email: session.user.email,
      name: session.user.name ?? null,
      displayName: trimmedDisplayName,
      publicId,
    });

    return ApiResponse(
      true,
      201,
      {
        id: user._id.toString(),
        displayName: user.displayName,
        publicId: user.publicId,
        email: user.email,
        name: user.name,
      },
      "User created successfully",
    );
  } catch (error) {
    console.error("Create user error:", error);

    return ApiResponse(false, 500, null, "Failed to create user");
  }
}