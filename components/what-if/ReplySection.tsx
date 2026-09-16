"use client";

import { useEffect, useRef, useState } from "react";
import ReplyInput from "./ReplyInput";
import ReplyList from "./ReplyList";
import useReplies from "@/hooks/useReplies";

interface ReplySectionProps {
  whatIfId: string;
  totalReplies: number;
}

const ReplySection = ({
  whatIfId,
  totalReplies,
}: ReplySectionProps) => {
  const {
    replies,
    loading,
    loadingMore,
    posting,
    hasMore,
    loadMore,
    createReply,
  } = useReplies(whatIfId);

  const [replyCount, setReplyCount] =
    useState(totalReplies);

  const loadMoreRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    setReplyCount(totalReplies);
  }, [totalReplies]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  const handleCreateReply = async (
    content: string
  ) => {
    const newReply = await createReply(content);

    if (!newReply) {
      return false;
    }

    setReplyCount((prev) => prev + 1);

    return true;
  };

  return (
    <section className="mx-auto mt-14 w-full max-w-2xl">
      {/* Heading */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-black uppercase tracking-tight">
          💀 TERRIBLE SUGGESTIONS
        </h2>

        <span className="text-xs font-black uppercase">
          {replyCount}{" "}
          {replyCount === 1
            ? "REPLY"
            : "REPLIES"}
        </span>
      </div>

      {/* Add Level 1 Reply */}

      <div className="mb-7">
        <ReplyInput
          onSubmit={handleCreateReply}
          loading={posting}
        />
      </div>

      {/* Initial Loading */}

      {loading ? (
        <div className="py-8 text-center text-xs font-black uppercase text-black/40">
          LOADING DAMAGE...
        </div>
      ) : (
        <>
          <ReplyList
            replies={replies}
            whatIfId={whatIfId}
          />

          {/* Infinite scroll trigger */}

          {hasMore && (
            <div
              ref={loadMoreRef}
              className="flex min-h-16 items-center justify-center"
            >
              {loadingMore && (
                <span className="text-xs font-black uppercase text-black/40">
                  MORE DAMAGE...
                </span>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ReplySection;