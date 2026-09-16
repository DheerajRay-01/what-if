import { ImageResponse } from "next/og";

import WhatIf from "@/models/whatif.model";
import mongoose from "mongoose";
import { connectDB } from "@/lib/connectDB";

export const runtime = "nodejs";

export const alt = "What If…?";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OpenGraphImage({
  params,
}: Props) {
  const { id } = await params;

  // Invalid MongoDB ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return createFallbackImage();
  }

  await connectDB();

  const whatIf = await WhatIf.findOne({
    _id: id,
    status: "active",
  })
    .select("content reactionCounts replyCount")
    .lean();

  // What If not found
  if (!whatIf) {
    return createFallbackImage();
  }

  const reactions = {
    funny: whatIf.reactionCounts?.funny ?? 0,
    interesting: whatIf.reactionCounts?.interesting ?? 0,
    crazy: whatIf.reactionCounts?.crazy ?? 0,
    build: whatIf.reactionCounts?.build ?? 0,
  };

  const content = truncateContent(whatIf.content);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fffdf5",
          padding: "55px",
          fontFamily: "Arial",
          color: "#000",
        }}
      >
        {/* Card */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            border: "4px solid #000",
            padding: "42px",
            boxShadow: "12px 12px 0 #000",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            WHAT IF…?
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                maxWidth: "1000px",
                fontSize: "46px",
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: "-1.5px",
              }}
            >
              {content}
            </div>

            {/* Reactions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              <span>😂 {reactions.funny}</span>

              <span>👀 {reactions.interesting}</span>

              <span>🤯 {reactions.crazy}</span>

              <span>🚀 {reactions.build}</span>

              <span>💬 {whatIf.replyCount ?? 0}</span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                fontWeight: 700,
                color: "#777",
              }}
            >
              whatiff.vercel.app
            </div>

            {/* Doodle */}
            <div
              style={{
                width: "85px",
                height: "5px",
                backgroundColor: "#000",
                transform: "rotate(-4deg)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

/* -------------------------------- */
/* Helpers */
/* -------------------------------- */

function truncateContent(content: string) {
  const maxLength = 150;

  if (content.length <= maxLength) {
    return content;
  }

  return `${content.slice(0, maxLength - 3).trim()}...`;
}

function createFallbackImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fffdf5",
          padding: "55px",
          fontFamily: "Arial",
          color: "#000",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            border: "4px solid #000",
            boxShadow: "12px 12px 0 #000",
            fontSize: "64px",
            fontWeight: 900,
          }}
        >
          WHAT IF…?
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}