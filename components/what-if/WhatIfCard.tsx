"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ReactionBar from "./ReactionBar";

interface WhatIfCardProps {
  id: string;
  content: string;
  reactionCounts: {
    funny: number;
    interesting: number;
    crazy: number;
    build: number;
  };
  replyCount: number;
  topComment?: string;
}

export default function WhatIfCard({
  id,
  content,
  reactionCounts,
  replyCount,
  topComment,
}: WhatIfCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/what-ifs/${id}`);
  };

  const handleCardKeyDown = (
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
      onKeyDown={handleCardKeyDown}
      className="
        group relative flex h-full flex-col
        cursor-pointer
        border-2 border-foreground
        bg-background
        p-4
        shadow-[4px_4px_0px_0px_currentColor]
        transition-all
        hover:-translate-x-0.5
        hover:-translate-y-0.5
        hover:shadow-[6px_6px_0px_0px_currentColor]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-foreground
        focus-visible:ring-offset-2
        sm:p-5
      "
    >
      {/* Decorative scribble */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-2 -top-2
          w-10
          rotate-[-7deg]
          border-t-2
          border-dashed
          border-foreground
        "
      />

      {/* Thought */}
      <p
        className="
          text-lg font-bold leading-snug tracking-tight
          sm:text-xl
        "
      >
        {content}
      </p>

      {/* Worse Version */}
      {topComment && (
        <div
          className="
            relative mt-4 block
            border-2 border-foreground
            bg-muted/30
            p-3
            transition-transform
            group-hover:rotate-[0.2deg]
            sm:p-3.5
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -left-1 -top-1
              h-2 w-8
              rotate-[-3deg]
              border-t
              border-dashed
              border-foreground
            "
          />

          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide">
            <Image
              src="/emojis/skull.svg"
              alt=""
              width={22}
              height={22}
              className="inline"
            />
            {" "}WORSE VERSION
          </p>

          <p className="text-sm leading-snug sm:text-base">
            “{topComment}”
          </p>

          {replyCount > 1 && (
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              <Image
                src="/emojis/clown.svg"
                alt=""
                width={22}
                height={22}
                className="inline"
              />
              {" "}{replyCount} more nonsense →
            </p>
          )}
        </div>
      )}

      {/* Bottom */}
      <div className="mt-auto pt-5">
        <div
          className="
            flex flex-col
            md:flex-row md:items-center md:justify-between
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

          {/* Open */}
          <div
            className="
              mt-4
              border-t-2 border-dashed border-foreground
              pt-3
              md:mt-0
              md:border-t-0
              md:pt-0
            "
          >
            <div className="flex justify-center md:justify-end">
              <span
                className="
                  flex items-center gap-1.5
                  text-sm font-black
                  transition-transform
                  group-hover:-rotate-1
                "
              >
                <Image
                  src="/emojis/clown.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="
                    transition-transform
                    group-hover:rotate-12
                  "
                />

                <span>SEE THIS NONSENSE →</span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={2.5}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}