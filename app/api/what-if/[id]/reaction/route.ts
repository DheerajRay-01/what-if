import mongoose from "mongoose";
import { NextRequest } from "next/server";

import { ApiResponse } from "@/lib/response";
import { createReactionSchema } from "@/lib/validations";
import Reaction from "@/models/reactions.model";
import WhatIf from "@/models/whatif.model";
import { auth } from "@/auth";
import User from "@/models/user.model";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return ApiResponse(false, 401, null, "Unauthorized");
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse(
        false,
        400,
        null,
        "Invalid What If ID"
      );
    }

    console.log("post",id);
    

    const { searchParams } = new URL(request.url);
    const react = searchParams.get("react");

    const result = createReactionSchema.safeParse({
      reactionType: react,
    });

  console.log("hello 1");

  
    

    if (!result.success) {
      return ApiResponse(
        false,
        400,
        null,
        result.error.issues[0].message
      );
    }
  console.log("hello 2");
    const { reactionType } = result.data;

    const user = await User.findOne({
      email: session.user.email,
      status: "active",
    }).select("_id");

    if (!user) {
      return ApiResponse(false, 404, null, "User not found");
    }
  console.log("hello 3");
    const authorId = user._id;

    // ...

    // Check What If
    const whatIf = await WhatIf.findOne({
      _id: id,
      status: "active",
    });

    if (!whatIf) {
      return ApiResponse(
        false,
        404,
        null,
        "What If not found"
      );
    }
console.log("hello 4");
    // Find existing reaction
    const existingReaction = await Reaction.findOne({
      authorId,
      whatIfId: id,
    });

    // ==========================================
    // 1. No reaction → ADD
    // ==========================================
    if (!existingReaction) {
      const [, updatedWhatIf] = await Promise.all([
        Reaction.create({
          authorId,
          whatIfId: id,
          reactionType,
        }),

        WhatIf.findByIdAndUpdate(
          id,
          {
            $inc: {
              [`reactionCounts.${reactionType}`]: 1,
            },
          },
          {
            new: true,
            projection: {
              reactionCounts: 1,
              _id: 0,
            },
          }
        ),
      ]);

      return ApiResponse(
        true,
        201,
        {
          reactionCounts: updatedWhatIf?.reactionCounts,
          reactionType,
        },
        "Reaction added successfully"
      );
    }

    // ==========================================
    // 2. Same reaction → REMOVE
    // ==========================================
    if (existingReaction.reactionType === reactionType) {
      const [, updatedWhatIf] = await Promise.all([
        Reaction.findByIdAndDelete(existingReaction._id),

        WhatIf.findByIdAndUpdate(
          id,
          {
            $inc: {
              [`reactionCounts.${reactionType}`]: -1,
            },
          },
          {
            new: true,
            projection: {
              reactionCounts: 1,
              _id: 0,
            },
          }
        ),
      ]);

      return ApiResponse(
        true,
        200,
        {
          reactionCounts: updatedWhatIf?.reactionCounts,
          reactionType: null,
        },
        "Reaction removed successfully"
      );
    }

    // ==========================================
    // 3. Different reaction → CHANGE
    // ==========================================
    const oldReactionType = existingReaction.reactionType;

    const [, updatedWhatIf] = await Promise.all([
      Reaction.findByIdAndUpdate(
        existingReaction._id,
        {
          reactionType,
        }
      ),

      WhatIf.findByIdAndUpdate(
        id,
        {
          $inc: {
            [`reactionCounts.${oldReactionType}`]: -1,
            [`reactionCounts.${reactionType}`]: 1,
          },
        },
        {
          new: true,
          projection: {
            reactionCounts: 1,
            _id: 0,
          },
        }
      ),
    ]);

    return ApiResponse(
      true,
      200,
      {
        reactionCounts: updatedWhatIf?.reactionCounts,
        reactionType,
      },
      "Reaction updated successfully"
    );
  } catch (error) {
    console.error("Failed to process reaction:", error);

    return ApiResponse(
      false,
      500,
      null,
      "Failed to process reaction"
    );
  }
}