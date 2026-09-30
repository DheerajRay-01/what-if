import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import WhatIf from "@/models/whatif.model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const whatIf = await WhatIf.findOne({
      postId: id,
      status: "active",
    })
      .populate("authorId", "_id displayName publicId")
      .lean();

    if (!whatIf) {
      return ApiResponse(
        false,
        404,
        null,
        "What If not found"
      );
    }

    const data = {
      _id: whatIf._id.toString(),
      postId: whatIf.postId,
      content: whatIf.content,

      authorId: whatIf.authorId
        ? {
            _id: whatIf.authorId._id.toString(),
            displayName: whatIf.authorId.displayName,
            publicId: whatIf.authorId.publicId,
          }
        : null,

      reactionCounts: {
        funny: whatIf.reactionCounts.funny,
        interesting: whatIf.reactionCounts.interesting,
        crazy: whatIf.reactionCounts.crazy,
        build: whatIf.reactionCounts.build,
      },

      replyCount: whatIf.replyCount,

      featuredReply: whatIf.featuredReply
        ? whatIf.featuredReply.toString()
        : null,

      status: whatIf.status,

      createdAt: whatIf.createdAt.toISOString(),
      updatedAt: whatIf.updatedAt.toISOString(),
    };

    return ApiResponse(
      true,
      200,
      data,
      "What If fetched successfully"
    );
  } catch (error) {
    console.error("Failed to fetch What If:", error);

    return ApiResponse(
      false,
      500,
      null,
      "Failed to fetch What If"
    );
  }
}