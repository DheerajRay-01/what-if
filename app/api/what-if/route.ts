import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import { createWhatIfSchema } from "@/lib/validations";
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

    if (cursor) {
      if (!mongoose.Types.ObjectId.isValid(cursor)) {
        return ApiResponse(false, 400, null, "Invalid cursor");
      }

      match._id = {
        $lt: new mongoose.Types.ObjectId(cursor),
      };
    }

    const posts = await WhatIf.aggregate([
      // 1. Get active posts
      {
        $match: match,
      },

      // 2. Latest posts first
      {
        $sort: {
          _id: -1,
        },
      },

      // 3. Fetch latest top-level reply
      {
        $lookup: {
          from: "replies",
          let: { whatIfId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$whatIfId", "$$whatIfId"] },
                    { $eq: ["$parentId", null] },
                    { $eq: ["$status", "active"] },
                  ],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 1,
            },
            {
              $project: {
                _id: 0,
                content: 1,
              },
            },
          ],
          as: "latestReply",
        },
      },

      // 4. Get one extra to determine hasMore
      {
        $limit: limit + 1,
      },

      // 5. Convert reply array into single value
      {
        $set: {
          topComment: {
            $ifNull: [
              { $arrayElemAt: ["$latestReply.content", 0] },
              null,
            ],
          },
        },
      },

      // 6. Remove temporary field
      {
        $project: {
          latestReply: 0,
        },
      },
    ]);

    const hasMore = posts.length > limit;

    const data = hasMore
      ? posts.slice(0, limit)
      : posts;

    const nextCursor =
      data.length > 0
        ? data[data.length - 1]._id.toString()
        : null;

    return ApiResponse(
      true,
      200,
      {
        posts: data,
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