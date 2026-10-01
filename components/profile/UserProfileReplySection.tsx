"use client";

import { Loader2 } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import UserProfileReplyCard from "./UserProfileReplyCard";

interface ReplyItem {
  _id: string;
  content: string;
  createdAt: string;
  whatIfId: {
    _id: string;
    content: string;
    postId: string;
  };
  parentId: {
    _id: string;
    content: string;
  } | null;
}

interface UserReplyResponse {
  status: boolean;
  data: {
    replies: ReplyItem[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

const UserProfileReplySection = () => {
  const [replies, setReplies] = useState<ReplyItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchReplies = useCallback(
    async (cursor?: string | null) => {
      try {
        if (cursor) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError(false);
        }

        const url = cursor
          ? `/api/me/replies?cursor=${encodeURIComponent(cursor)}`
          : "/api/me/replies";

        const response = await fetch(url);

        const result: UserReplyResponse = await response.json();

        if (!response.ok || !result.status) {
          throw new Error("Failed to fetch user's replies");
        }

        const newReplies = result.data.replies;

        if (cursor) {
          setReplies((prev) => [...prev, ...newReplies]);
        } else {
          setReplies(newReplies);
        }

        setNextCursor(result.data.nextCursor);
        setHasMore(result.data.hasMore);
      } catch (error) {
        console.error("Failed to fetch user's replies:", error);

        if (!cursor) {
          setError(true);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  // Initial fetch
  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  // Infinite scroll
  useEffect(() => {
    const target = observerRef.current;

    if (!target || !hasMore || loading || loadingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          nextCursor &&
          !loadingMore
        ) {
          fetchReplies(nextCursor);
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    nextCursor,
    hasMore,
    loading,
    loadingMore,
    fetchReplies,
  ]);

  return (
    <section>
      <div className="space-y-5">
        {replies.map((reply) => (
          <UserProfileReplyCard
            key={reply._id}
            reply={reply}
          />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {hasMore && (
        <div
          ref={observerRef}
          className="flex min-h-20 items-center justify-center"
          aria-hidden="true"
        >
          {loadingMore && (
            <div className="flex items-center gap-2">
              <Loader2
                size={18}
                className="animate-spin"
              />

              <span className="text-xs font-bold uppercase">
                Loading more nonsense...
              </span>
            </div>
          )}
        </div>
      )}

      {/* End */}
      {!hasMore && replies.length > 0 && (
        <div className="py-8 text-center">
          <span className="text-xs font-bold text-muted-foreground">
            — that's all the nonsense for now —
          </span>
        </div>
      )}
    </section>
  );
};

export default UserProfileReplySection;