import { auth } from "@/auth";
import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import Reply from "@/models/reply.model";
import User from "@/models/user.model";
import mongoose from "mongoose";




export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return ApiResponse(
        false,
        401,
        null,
        "Unauthorized"
      );
    }

    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");

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

    const user = await User.findOne({
      email: session.user.email,
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

    if (cursor) {
      query._id = {
        $lt: new mongoose.Types.ObjectId(cursor),
      };
    }

    const replies = await Reply.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .select(
        "whatIfId parentId content createdAt"
      )
      .populate("whatIfId", "postId content")
      .populate("parentId", "content")
      .lean();

   
      

    const hasMore = replies.length > limit;

    const data = hasMore
      ? replies.slice(0, limit)
      : replies;

    const plainReplies = data.map((reply) => ({
      ...reply,
      _id: reply._id.toString(),
    }));

    const nextCursor =
      hasMore && plainReplies.length > 0
        ? plainReplies[plainReplies.length - 1]._id
        : null;

    return ApiResponse(
      true,
      200,
      {
        replies: plainReplies,
        nextCursor,
        hasMore,
      },
      "User replies fetched successfully"
    );
  } catch (error) {
    console.error(
      "Failed to fetch user replies:",
      error
    );

    return ApiResponse(
      false,
      500,
      null,
      "Failed to fetch replies"
    );
  }
}