

import { connectDB } from "@/lib/connectDB";
import Reply from "@/models/reply.model";
import mongoose from "mongoose";
import { ApiResponse } from "@/lib/response";
import WhatIf from "@/models/whatif.model";
import { createReplySchema } from "@/lib/validations";



// GET and POST reply
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse(false, 400, null, "Invalid What If ID");
    }

    const { searchParams } = new URL(request.url);

    const limit = 10;
    const cursor = searchParams.get("cursor");

    const query: {
      status: "active";
      whatIfId: mongoose.Types.ObjectId;
      _id?: { $lt: mongoose.Types.ObjectId };
    } = {
      status: "active",
      whatIfId: new mongoose.Types.ObjectId(id),
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
      .limit(limit + 1);

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
      "Replies fetched successfully"
    );
  } catch (error) {
    console.error("Failed to fetch replies:", error);

    return ApiResponse(
      false,
      500,
      null,
      "Failed to fetch replies"
    );
  }
}


// POST reply
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse(false, 400, null, "Invalid What If ID");
    }

    const body = await request.json();

    const result = createReplySchema.safeParse(body);

    if (!result.success) {
      return ApiResponse(
        false,
        400,
        null,
        result.error.issues[0].message
      );
    }

    const { content, parentId } = result.data;

    // Check What If
    const whatIf = await WhatIf.findById(id);

    if (!whatIf) {
      return ApiResponse(
        false,
        404,
        null,
        "What If not found"
      );
    }

    // Check parent reply
    if (parentId) {
      if (!mongoose.Types.ObjectId.isValid(parentId)) {
        return ApiResponse(
          false,
          400,
          null,
          "Invalid parent reply ID"
        );
      }

      const parentReply = await Reply.findOne({
        _id: parentId,
        whatIfId: id,
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
    }

    // Create reply
    const reply = await Reply.create({
      whatIfId: id,
      parentId: parentId || null,
      content,
      status: "active",
    });

    // Increase reply count
    await WhatIf.findByIdAndUpdate(id, {
      $inc: {
        replyCount: 1,
      },
    });

    return ApiResponse(
      true,
      201,
      reply,
      "Reply posted successfully"
    );
  } catch (error) {
    console.error("Failed to post reply:", error);

    return ApiResponse(
      false,
      500,
      null,
      "Failed to post reply"
    );
  }
}