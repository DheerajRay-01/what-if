"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import ReactionBar from "../what-if/ReactionBar";

interface WhatIfProfileCardProps {
  id: string;
  postId: string;
  content: string;

  reactionCounts: {
    funny: number;
    interesting: number;
    crazy: number;
    build: number;
  };

  replyCount: number;
}

export default function WhatIfProfileCard({
  id,
  postId,
  content,
  reactionCounts,
  replyCount,
}: WhatIfProfileCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${postId}`);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="
        group
        relative
        cursor-pointer
        border-2
        border-foreground
        bg-background
        p-5
        shadow-[4px_4px_0px_0px_currentColor]
        transition-all
        duration-150
        hover:-translate-x-0.5
        hover:-translate-y-0.5
        hover:shadow-[6px_6px_0px_0px_currentColor]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-foreground
        focus-visible:ring-offset-2
        sm:p-6
      "
    >
      {/* Tiny label */}
      <p
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-muted-foreground
        "
      >
        WHAT IF
      </p>

      {/* What If content */}
      <p
        className="
          mt-3
          max-w-xl
          text-lg
          font-black
          leading-snug
          tracking-tight
          sm:text-xl
          line-clamp-4
        "
      >
        {content}
      </p>

      {/* Bottom metadata */}
      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          gap-4
          border-t-2
          border-dashed
          border-foreground
          pt-3
        "
      >
        {/* Reactions */}
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <ReactionBar
            reactionCounts={reactionCounts}
            whatIfId={id}
          />
        </div>

        {/* Reply + open */}
        <div className="flex shrink-0 items-center gap-4">
          {replyCount >= 0 && (
            <div className="flex items-center gap-1.5">
              <MessageCircle
                size={15}
                strokeWidth={2.5}
                aria-hidden="true"
              />

              <span className="text-xs font-black">
                {replyCount}
              </span>
            </div>
          )}

          <ArrowUpRight
            size={19}
            strokeWidth={2.5}
            aria-hidden="true"
            className="
              transition-transform
              duration-150
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>
    </article>
  );
}