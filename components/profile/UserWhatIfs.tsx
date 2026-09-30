"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import WhatIfProfileCard from "./WhatIfProfileCard";


interface UserWhatIf {
  _id: string;
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

interface UserWhatIfsResponse {
  status: boolean;
  data: {
    posts: UserWhatIf[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

interface UserWhatIfsProps {
  endpoint: string;
}

function WhatIfSkeleton() {
  return (
    <div
      className="
        animate-pulse
        border-2 border-foreground
        bg-background
        p-4
        shadow-[4px_4px_0px_0px_currentColor]
        sm:p-5
      "
    >
      <div className="h-6 w-4/5 rounded bg-muted" />

      <div className="mt-6 h-5 w-3/5 rounded bg-muted" />

      <div className="mt-4 h-4 w-1/3 rounded bg-muted" />
    </div>
  );
}

export default function UserWhatIfs({
  endpoint,
}: UserWhatIfsProps) {
  const [posts, setPosts] = useState<UserWhatIf[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(
    null
  );
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(
    async (cursor?: string | null) => {
      try {
        if (cursor) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError(false);
        }

        const url = cursor
          ? `${endpoint}?cursor=${encodeURIComponent(cursor)}`
          : endpoint;

        const response = await fetch(url);

        const result: UserWhatIfsResponse =
          await response.json();

        if (!response.ok || !result.status) {
          throw new Error(
            "Failed to fetch user's What Ifs"
          );
        }

        const newPosts = result.data.posts;

        if (cursor) {
          setPosts((prev) => [...prev, ...newPosts]);
        } else {
          setPosts(newPosts);
        }

        setNextCursor(result.data.nextCursor);
        setHasMore(result.data.hasMore);
      } catch (error) {
        console.error(
          "Failed to fetch user's What Ifs:",
          error
        );

        if (!cursor) {
          setError(true);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [endpoint]
  );

  // Initial fetch / endpoint change
  useEffect(() => {
    setPosts([]);
    setNextCursor(null);
    setHasMore(true);
    setError(false);

    fetchPosts();
  }, [endpoint, fetchPosts]);

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
  }, [
    nextCursor,
    hasMore,
    loading,
    loadingMore,
    fetchPosts,
  ]);

  // Initial loading
  if (loading) {
    return (
      <section className="space-y-5">
        <WhatIfSkeleton />
        <WhatIfSkeleton />
        <WhatIfSkeleton />
      </section>
    );
  }

  // Initial error
  if (error) {
    return (
      <section className="py-10 text-center">
        <p className="text-sm font-bold">
          Couldn't load the nonsense.
        </p>

        <button
          type="button"
          onClick={() => fetchPosts()}
          className="
            mt-3
            text-sm font-black
            underline decoration-dashed
            underline-offset-4
            hover:-rotate-1
          "
        >
          TRY AGAIN →
        </button>
      </section>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <section className="py-12 text-center">
        <div className="text-3xl">✦</div>

        <p className="mt-3 text-sm font-black uppercase">
          Nothing here yet.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          The nonsense hasn't started.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="space-y-5">
        {posts.map((post) => (
          <WhatIfProfileCard
            key={post._id}
            id={post._id}
            postId={post.postId}
            content={post.content}
            reactionCounts={post.reactionCounts}
            replyCount={post.replyCount}
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
      {!hasMore && posts.length > 0 && (
        <div className="py-8 text-center">
          <span className="text-xs font-bold text-muted-foreground">
            — that's all the nonsense for now —
          </span>
        </div>
      )}
    </section>
  );
}