import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import { createWhatIfSchema } from "@/lib/validations";
import WhatIf from "@/models/whatif.model";
import Reply from "@/models/reply.model";
console.log(Reply);
import mongoose, { Cursor } from "mongoose";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import User from "@/models/user.model";
import { customAlphabet } from "nanoid";



// POST - create a What If
export async function POST(request: Request) {
const session = await auth();

console.log("user:",session);


if (!session?.user?.email) {
  return ApiResponse(false, 401, null, "Unauthorized");
}

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

    const user = await User.findOne({
  email: session.user.email,
  status: "active",
}).select("_id");

const generatePostId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  8
);

const postId = generatePostId();

console.log("postId",postId);


    const newPost = await WhatIf.create({
      content: result.data.content,
      authorId: user._id,
      postId
    });

    console.log(newPost);
    

    // Invalidate cached feed
    revalidateTag("what-if-feed", "max");

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
async function getWhatIfs(cursor: string | null) {
  "use cache";

  cacheLife("minutes");
  cacheTag("what-if-feed");

  await connectDB();

  console.log("Reply model:", mongoose.models.Reply);

  const limit = 10;

  const match: {
    status: "active";
    _id?: { $lt: mongoose.Types.ObjectId };
  } = {
    status: "active",
  };

  // Validate cursor
  if (cursor) {
    match._id = {
      $lt: new mongoose.Types.ObjectId(cursor),
    };
  }


  // Fetch posts
  const posts = await WhatIf.find(match)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .populate("featuredReply", "_id content")
    .populate("authorId", "_id displayName publicId")
    .lean();



const plainPosts = posts.map((post) => ({
  _id: post._id.toString(),

  postId: post.postId,

  content: post.content,

  authorId: post.authorId
    ? {
        _id: post.authorId._id.toString(),
        displayName: post.authorId.displayName,
        publicId: post.authorId.publicId,
      }
    : null,

  reactionCounts: {
    funny: post.reactionCounts.funny,
    interesting: post.reactionCounts.interesting,
    crazy: post.reactionCounts.crazy,
    build: post.reactionCounts.build,
  },

  replyCount: post.replyCount,

  featuredReply: post.featuredReply
    ? {
        _id: post.featuredReply._id.toString(),
        content: post.featuredReply.content,
      }
    : null,

  status: post.status,

  createdAt: post.createdAt.toISOString(),
  updatedAt: post.updatedAt.toISOString(),
}));

  // Pagination
  const hasMore = plainPosts.length > limit;

  const data = hasMore
    ? plainPosts.slice(0, limit)
    : plainPosts;

  // No posts
  if (data.length === 0) {
    return {
      posts: [],
      nextCursor: null,
      hasMore: false,
    };
  }


  // Next cursor
  const nextCursor =
    data[data.length - 1]._id.toString();

  return {
    posts: data,
    nextCursor,
    hasMore,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");

    // Validate cursor
    if (cursor && !mongoose.Types.ObjectId.isValid(cursor)) {
      return ApiResponse(
        false,
        400,
        null,
        "Invalid cursor"
      );
    }

    const data = await getWhatIfs(cursor);

    return ApiResponse(
      true,
      200,
      data,
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