import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import Reply from "@/models/reply.model";
import mongoose from "mongoose";


export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const idsParam = searchParams.get("ids");

    // Validate ids
    if (!idsParam) {
      return ApiResponse(
        false,
        400,
        null,
        "Post IDs are required"
      );
    }

    const ids = idsParam
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    // Prevent unnecessarily large requests
    if (ids.length === 0) {
      return ApiResponse(
        false,
        400,
        null,
        "Post IDs are required"
      );
    }

    if (ids.length > 20) {
      return ApiResponse(
        false,
        400,
        null,
        "Maximum 20 post IDs are allowed"
      );
    }

    // Validate every ID
    const invalidId = ids.find(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );

    if (invalidId) {
      return ApiResponse(
        false,
        400,
        null,
        `Invalid post ID: ${invalidId}`
      );
    }

    const postIds = ids.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Fetch Level-1 replies
    const replies = await Reply.find({
      whatIfId: { $in: postIds },
      parentId: null,
      status: "active",
    })
      .sort({ createdAt: 1 })
      .select("_id whatIfId content")
      .lean();

    // Keep only the first reply for each What If
    const firstReplyMap = new Map<
      string,
      {
        _id: string;
        content: string;
      }
    >();

    for (const reply of replies) {
      const postId = reply.whatIfId.toString();

      if (!firstReplyMap.has(postId)) {
        firstReplyMap.set(postId, {
          _id: reply._id.toString(),
          content: reply.content,
        });
      }
    }

    // Convert Map to plain object
    const firstReplies: Record<
      string,
      {
        _id: string;
        content: string;
      } | null
    > = {};

    for (const id of ids) {
      firstReplies[id] = firstReplyMap.get(id) ?? null;
    }

    return ApiResponse(
      true,
      200,
      {
        firstReplies,
      },
      "First replies fetched successfully"
    );
  } catch (error) {
    console.error(
      "Failed to fetch first replies:",
      error
    );

    return ApiResponse(
      false,
      500,
      null,
      "Failed to fetch first replies"
    );
  }
}