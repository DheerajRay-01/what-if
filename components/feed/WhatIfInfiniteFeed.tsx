"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import WhatIfCard from "@/components/what-if/WhatIfCard";
import WhatIfFeedSkeleton from "../Skeleton/WhatIfFeedSkeleton";

interface WhatIf {
  _id: string;
  content: string;
  reactionCounts: {
    funny: number;
    interesting: number;
    crazy: number;
    build: number;
  };
  replyCount: number;
  featuredReply: {
    _id: string;
    content: string;
  } | null;
}

interface ApiResponse {
  status: boolean;
  data: {
    posts: WhatIf[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export default function WhatIfInfiniteFeed() {
  const [posts, setPosts] = useState<WhatIf[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const fetchPosts = useCallback(async (cursor?: string | null) => {
    if (loadingRef.current) return;

    try {
      loadingRef.current = true;
      setLoading(true);

      const url = cursor
        ? `/api/what-if?cursor=${encodeURIComponent(cursor)}`
        : "/api/what-if";

      const res = await fetch(url);

      const result: ApiResponse = await res.json();

      if (!res.ok || !result.status) {
        throw new Error("Failed to fetch What Ifs");
      }

      const fetchedPosts = result.data.posts;

      setPosts((prev) => {
        if (!cursor) {
          return fetchedPosts;
        }

        const existingIds = new Set(
          prev.map((post) => post._id)
        );

        const newPosts = fetchedPosts.filter(
          (post) => !existingIds.has(post._id)
        );

        return [...prev, ...newPosts];
      });

      setNextCursor(result.data.nextCursor);
      setHasMore(result.data.hasMore);
    } catch (error) {
      console.error("Failed to fetch What Ifs:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Infinite scroll
  useEffect(() => {
    const target = observerRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          nextCursor &&
          !loadingRef.current
        ) {
          fetchPosts(nextCursor);
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
  }, [nextCursor, hasMore, fetchPosts]);

  if (loading && posts.length === 0) {
    return <WhatIfFeedSkeleton />;
  }

  return (
    <section>
      {/* What If Feed */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <WhatIfCard
            key={post._id}
            id={post._id}
            content={post.content}
            reactionCounts={post.reactionCounts}
            replyCount={post.replyCount}
            featuredReply={post.featuredReply}
          />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      <div
        ref={observerRef}
        className="flex min-h-20 items-center justify-center"
      >
        {loading && (
          <p className="text-sm font-medium text-muted-foreground">
            Loading more nonsense... 💩
          </p>
        )}

        {!loading && !hasMore && posts.length > 0 && (
          <p className="text-sm font-medium text-muted-foreground">
            You&apos;ve reached the bottom of the nonsense. 💀
          </p>
        )}
      </div>
    </section>
  );
}