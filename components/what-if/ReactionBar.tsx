"use client";

import Image from "next/image";
import { useState } from "react";

interface ReactionCounts {
  funny: number;
  interesting: number;
  crazy: number;
  build: number;
}

interface ReactionBarProps {
  reactionCounts: ReactionCounts;
  whatIfId: string;
}

const reactions = [
  {
    type: "funny",
    src: "/emojis/laughing.svg",
  },
  {
    type: "interesting",
    src: "/emojis/eyes.svg",
  },
  {
    type: "crazy",
    src: "/emojis/exploding-head.svg",
  },
  {
    type: "build",
    src: "/emojis/rocket.svg",
  },
] as const;

type ReactionType = (typeof reactions)[number]["type"];

interface ReactionResponse {
  status: boolean;
  data: {
    reactionCounts: ReactionCounts;
    reactionType: ReactionType | null;
  } | null;
  msg: string;
}

export const submitReact = async ({
  whatIfId,
  reactionType,
}: {
  whatIfId: string;
  reactionType: ReactionType;
}) => {
  const res = await fetch(
    `/api/what-if/${whatIfId}/reaction?react=${reactionType}`,
    {
      method: "POST",
    }
  );

  const data: ReactionResponse = await res.json();

  if (!res.ok || !data.status) {
    throw new Error(data.msg || "Failed to react");
  }

  return data;
};

const ReactionBar = ({
  reactionCounts,
  whatIfId,
}: ReactionBarProps) => {
  const [counts, setCounts] = useState<ReactionCounts>(reactionCounts);
  const [loading, setLoading] = useState<ReactionType | null>(null);
  const [activeReaction, setActiveReaction] = useState<ReactionType | null>(null);

const handleReact = async (reactionType: ReactionType) => {
  if (loading) return;

  try {
    setLoading(reactionType);

    // Trigger animation
    setActiveReaction(reactionType);

    const data = await submitReact({
      whatIfId,
      reactionType,
    });

    if (data.data?.reactionCounts) {
      setCounts(data.data.reactionCounts);
    }
  } catch (error) {
    console.error("Failed to react:", error);
  } finally {
    setLoading(null);

    // Reset animation
    setTimeout(() => {
      setActiveReaction(null);
    }, 300);
  }
};
  return (
    <div
      className="
        flex items-center justify-around
        gap-4
        text-sm
        md:justify-start md:gap-5
      "
    >
      {reactions.map((reaction) => (
        <button
          key={reaction.type}
          type="button"
          disabled={loading !== null}
          onClick={() => handleReact(reaction.type)}
          className="
            flex items-center gap-1
            transition-transform
            hover:-translate-y-0.5
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
        <Image
  src={reaction.src}
  alt=""
  width={25}
  height={25}
  className={
    activeReaction === reaction.type
      ? "animate-reaction-pop"
      : ""
  }
/>

         
{counts?.[reaction.type] ?? 0}
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;