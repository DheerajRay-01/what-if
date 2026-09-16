import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import Reply from "@/models/reply.model";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      replyId: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id, replyId } = await params;

    // Validate What If ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse(false, 400, null, "Invalid What If ID");
    }

    // Validate parent reply ID
    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      return ApiResponse(false, 400, null, "Invalid Reply ID");
    }

    const whatIfId = new mongoose.Types.ObjectId(id);
    const parentId = new mongoose.Types.ObjectId(replyId);

    const { searchParams } = new URL(request.url);

    const limit = 5;
    const cursor = searchParams.get("cursor");

    // Make sure the parent is actually a Level 1 reply
    const parentReply = await Reply.exists({
      _id: parentId,
      whatIfId,
      parentId: null,
      status: "active",
    });

    if (!parentReply) {
      return ApiResponse(
        false,
        404,
        null,
        "Parent reply not found"
      );
    }

    const query: {
      status: "active";
      whatIfId: mongoose.Types.ObjectId;
      parentId: mongoose.Types.ObjectId;
      _id?: { $lt: mongoose.Types.ObjectId };
    } = {
      status: "active",
      whatIfId,
      parentId,
    };

    if (cursor) {
      if (!mongoose.Types.ObjectId.isValid(cursor)) {
        return ApiResponse(false, 400, null, "Invalid cursor");
      }

      query._id = {
        $lt: new mongoose.Types.ObjectId(cursor),
      };
    }

    const replies = await Reply.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .select("_id content");

    const hasMore = replies.length > limit;

    const data = hasMore
      ? replies.slice(0, limit)
      : replies;

    const nextCursor = hasMore
      ? data[data.length - 1]._id.toString()
      : null;

    return ApiResponse(
      true,
      200,
      {
        replies: data,
        nextCursor,
        hasMore,
      },
      "Level 2 replies fetched successfully"
    );
  } catch (error) {
    console.error("Failed to fetch Level 2 replies:", error);

    return ApiResponse(
      false,
      500,
      null,
      "Failed to fetch replies"
    );
  }
}