import { connectDB } from "@/lib/connectDB";
import { ApiResponse } from "@/lib/response";
import WhatIf from "@/models/whatif.model";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse(
        false,
        400,
        null,
        "Invalid ID"
      );
    }

    const whatIf = await WhatIf.findById(id);

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