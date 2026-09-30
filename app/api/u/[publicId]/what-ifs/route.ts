import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import User from "@/models/user.model";
import WhatIf from "@/models/whatif.model";
import mongoose from "mongoose";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;

    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");

    // Validate cursor
    if (
      cursor &&
      !mongoose.Types.ObjectId.isValid(cursor)
    ) {
      return ApiResponse(
        false,
        400,
        null,
        "Invalid cursor"
      );
    }

    await connectDB();

    // Find public user
    const user = await User.findOne({
      publicId,
      status: "active",
    }).select("_id");

    if (!user) {
      return ApiResponse(
        false,
        404,
        null,
        "User not found"
      );
    }

    const limit = 10;

    const query: {
      authorId: mongoose.Types.ObjectId;
      status: "active";
      _id?: {
        $lt: mongoose.Types.ObjectId;
      };
    } = {
      authorId: user._id,
      status: "active",
    };

    // Cursor pagination
    if (cursor) {
      query._id = {
        $lt: new mongoose.Types.ObjectId(cursor),
      };
    }

    const posts = await WhatIf.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .select(
        "_id postId content reactionCounts replyCount featuredReply createdAt"
      )
      .lean();

    // Check if more posts exist
    const hasMore = posts.length > limit;

    const data = hasMore
      ? posts.slice(0, limit)
      : posts;

    // Convert MongoDB ObjectId
    const plainPosts = data.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));

    const nextCursor =
      hasMore && plainPosts.length > 0
        ? plainPosts[plainPosts.length - 1]._id
        : null;

    return ApiResponse(
      true,
      200,
      {
        posts: plainPosts,
        nextCursor,
        hasMore,
      },
      "User What Ifs fetched successfully"
    );
  } catch (error) {
    console.error(
      "Failed to fetch public user's What Ifs:",
      error
    );

    return ApiResponse(
      false,
      500,
      null,
      "Failed to fetch What Ifs"
    );
  }
}