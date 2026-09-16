"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Level1Reply, Level2Reply } from "@/types/reply";

interface UseRepliesResult {
  replies: Level1Reply[];
  loading: boolean;
  loadingMore: boolean;
  posting: boolean;
  hasMore: boolean;
  loadMore: () => void;
 createReply: (
  content: string,
  parentId?: string | null
) => Promise<Level1Reply | Level2Reply | null>;
  refresh: () => void;
}

const useReplies = (
  whatIfId: string
): UseRepliesResult => {
  const [replies, setReplies] = useState<Level1Reply[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posting, setPosting] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchReplies = useCallback(
    async (cursor: string | null = null) => {
      try {
        if (cursor) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const url = new URL(
          `/api/what-if/${whatIfId}/replies`,
          window.location.origin
        );

        if (cursor) {
          url.searchParams.set("cursor", cursor);
        }

        const response = await fetch(url.toString());

        const result = await response.json();

        if (!response.ok || !result.status) {
          throw new Error(
            result.msg || "Failed to fetch replies"
          );
        }

        const data = result.data;

        if (cursor) {
          setReplies((prev) => [
            ...prev,
            ...data.replies,
          ]);
        } else {
          setReplies(data.replies);
        }

        setNextCursor(data.nextCursor);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error(
          "Failed to fetch replies:",
          error
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [whatIfId]
  );

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  const loadMore = useCallback(() => {
    if (
      loading ||
      loadingMore ||
      !hasMore ||
      !nextCursor
    ) {
      return;
    }

    fetchReplies(nextCursor);
  }, [
    loading,
    loadingMore,
    hasMore,
    nextCursor,
    fetchReplies,
  ]);

 const createReply = useCallback(
  async (
    content: string,
    parentId: string | null = null
  ): Promise<Level1Reply | Level2Reply | null> => {
    if (!content.trim() || posting) {
      return null;
    }

    try {
      setPosting(true);

      const response = await fetch(
        `/api/what-if/${whatIfId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content.trim(),
            parentId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(
          result.msg || "Failed to post reply"
        );
      }

      const newReply = result.data as
        | Level1Reply
        | Level2Reply;

      // Add newly created Level 1 reply
      // immediately to the state
      if (parentId === null) {
        setReplies((prev) => [
          newReply as Level1Reply,
          ...prev,
        ]);
      }

      toast.success("Your nonsense escaped! 💥");

      return newReply;
    } catch (error) {
      console.error(
        "Failed to post reply:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

      return null;
    } finally {
      setPosting(false);
    }
  },
  [whatIfId, posting]
);

  const refresh = useCallback(() => {
    setReplies([]);
    setNextCursor(null);
    setHasMore(true);

    fetchReplies();
  }, [fetchReplies]);

  return {
    replies,
    loading,
    loadingMore,
    posting,
    hasMore,
    loadMore,
    createReply,
    refresh,
  };
};

export default useReplies;