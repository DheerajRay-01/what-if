"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import WhatIfCard from "@/components/what-if/WhatIfCard";
import Image from "next/image";

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
  topComment: string | null;
}

interface ApiResponse {
  status: boolean;
  data: {
    posts: WhatIf[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export default function WhatIfFeed() {
  const [posts, setPosts] = useState<WhatIf[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/what-if");

      const result: ApiResponse = await res.json();

      if (!res.ok || !result.status) {
        throw new Error("Failed to fetch What Ifs");
      }

      setPosts(result.data.posts);
    } catch (error) {
      console.error("Failed to fetch What Ifs:", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section>
      {/* Feed Heading */}
      <div className="mb-6">
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              <Image
                src="/emojis/loudly-crying-face.svg"

                className="inline"
                alt=""
                width={45}
                height={45}
              />
           Why Did We Think Of This?
        </h2>

        <div
          aria-hidden="true"
          className="
            mt-1
            h-1
            w-28
            rotate-[-2deg]
            border-b-2
            border-dashed
            border-foreground
          "
        />
      </div>

      {/* Loading */}
      {loading && posts.length === 0 && (
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm font-medium text-muted-foreground">
            Loading nonsense... 💩
          </p>
        </div>
      )}

      {/* What If Feed */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <WhatIfCard
            key={post._id}
            id={post._id}
            content={post.content}
            reactionCounts={post.reactionCounts}
            replyCount={post.replyCount}
            topComment={post.topComment ?? undefined}
          />
        ))}
      </div>

      {/* View More */}
      {!loading && posts.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/what-ifs"
            className="
              group
              flex items-center gap-2
              border-2 border-foreground
              bg-background
              px-6 py-3
              text-sm font-black
              shadow-[4px_4px_0px_0px_currentColor]
              transition-all
              hover:-translate-x-0.5
              hover:-translate-y-0.5
              hover:shadow-[6px_6px_0px_0px_currentColor]
              sm:px-7
              sm:py-3.5
              sm:text-base
            "
          >
             <Image
                src="/emojis/loudly-crying-face.svg"

                className="inline"
                alt=""
                width={40}
                height={40}
              />
             THERE’S MORE?!
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}