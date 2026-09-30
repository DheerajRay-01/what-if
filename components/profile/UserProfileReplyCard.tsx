"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, CornerDownRight } from "lucide-react";

interface UserProfileReplyCardProps {
  reply: {
    _id: string;
    content: string;

    whatIfId: {
      _id: string;
      content: string;
      postId?: string;
    };

    parentId: {
      _id: string;
      content: string;
    } | null;
  };
}

export default function UserProfileReplyCard({
  reply,
}: UserProfileReplyCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (reply.whatIfId.postId) {
      router.push(`/${reply.whatIfId.postId}`);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleClick}
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <p
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-muted-foreground
          "
        >
          YOU REPLIED
        </p>

        <ArrowUpRight
          size={18}
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

      {/* Your reply */}
      <p
        className="
          mt-3
          text-lg
          font-black
          leading-snug
          tracking-tight
          sm:text-xl
        "
      >
        {reply.content}
      </p>

      {/* Parent reply */}
      {reply.parentId && (
        <div
          className="
            mt-5
            border-l-2
            border-dashed
            border-foreground
            pl-4
          "
        >
          <div className="flex items-center gap-1.5">
            <CornerDownRight
              size={14}
              strokeWidth={2.5}
              aria-hidden="true"
            />

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.15em]
                text-muted-foreground
              "
            >
              REPLYING TO
            </p>
          </div>

          <p
            className="
              mt-1.5
              text-sm
              font-medium
              leading-snug
              text-muted-foreground
            "
          >
            “{reply.parentId.content}”
          </p>
        </div>
      )}

      {/* Original What If */}
      <div
        className="
          mt-5
          border-t-2
          border-dashed
          border-foreground
          pt-4
        "
      >
        <p
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-muted-foreground
          "
        >
          ON THIS WHAT IF
        </p>

        <p
          className="
            mt-1.5
            line-clamp-2
            text-sm
            font-bold
            leading-snug
          "
        >
          {reply.whatIfId.content}
        </p>
      </div>
    </article>
  );
}