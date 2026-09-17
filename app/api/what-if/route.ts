import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import { createWhatIfSchema } from "@/lib/validations";
import Reply from "@/models/reply.model";
import WhatIf from "@/models/whatif.model";
import mongoose, { Cursor } from "mongoose";
import { Content } from "next/font/google";

// POST - create a What If
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = createWhatIfSchema.safeParse(body);

    if (!result.success) {
      return ApiResponse(
        false,
        400,
        null,
        result.error.issues[0].message
      );
    }

    await connectDB();

    const newPost = await WhatIf.create({
      content: result.data.content,
    });

    return ApiResponse(
      true,
      201,
      newPost,
      "What If posted successfully"
    );
  } catch (error) {
    console.error("Failed to create What If:", error);

    return ApiResponse(
      false,
      500,
      null,
      "Failed to create What If"
    );
  }
}


// GET - fetch all What If

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");
    const limit = 10;

    const match: {
      status: "active";
      _id?: { $lt: mongoose.Types.ObjectId };
    } = {
      status: "active",
    };

    // 1. Validate cursor
    if (cursor) {
      if (!mongoose.Types.ObjectId.isValid(cursor)) {
        return ApiResponse(false, 400, null, "Invalid cursor");
      }

      match._id = {
        $lt: new mongoose.Types.ObjectId(cursor),
      };
    }

    // 2. Fetch posts
    const posts = await WhatIf.find(match)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    // 3. Check pagination
    const hasMore = posts.length > limit;

    const data = hasMore
      ? posts.slice(0, limit)
      : posts;

    // 4. If no posts
    if (data.length === 0) {
      return ApiResponse(
        true,
        200,
        {
          posts: [],
          nextCursor: null,
          hasMore: false,
        },
        "Posts fetched successfully"
      );
    }

    // 5. Get post IDs
    const postIds = data.map((post) => post._id);

    // 6. Fetch Level-1 replies
    const replies = await Reply.find({
      whatIfId: { $in: postIds },
      parentId: null,
      status: "active",
    })
      .sort({ createdAt: 1 })
      .select("_id whatIfId content")
      .lean();

    // 7. Store first reply for each What If
    const firstReplyMap = new Map<
      string,
      {
        _id: mongoose.Types.ObjectId;
        content: string;
      }
    >();

    for (const reply of replies) {
      const whatIfId = reply.whatIfId.toString();

      if (!firstReplyMap.has(whatIfId)) {
        firstReplyMap.set(whatIfId, {
          _id: reply._id,
          content: reply.content,
        });
      }
    }

    // 8. Merge first reply with posts
    const mergedPosts = data.map((post) => ({
      ...post,
      topComment:
        firstReplyMap.get(post._id.toString())?.content ?? null,
    }));

    // 9. Next cursor
    const nextCursor =
      mergedPosts.length > 0
        ? mergedPosts[mergedPosts.length - 1]._id.toString()
        : null;

    console.log("data:", mergedPosts);

    // 10. Response
    return ApiResponse(
      true,
      200,
      {
        posts: mergedPosts,
        nextCursor,
        hasMore,
      },
      "Posts fetched successfully"
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




