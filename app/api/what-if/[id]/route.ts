import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import WhatIf from "@/models/whatif.model";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await connectDB();

    const { postId } = await params;

    
    const whatIf = await WhatIf.findOne({postId}).populate("authorId", "_id displayName")
                            

    if (!whatIf) {
      return ApiResponse(
        false,
        404,
        null,
        "What If not found"
      );
    }

    return ApiResponse(
      true,
      200,
      whatIf,
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