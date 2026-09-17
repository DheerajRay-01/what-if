"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface WhatIf {
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
  firstReplyLoading: boolean;
}

interface PostsApiResponse {
  status: boolean;
  data: {
    posts: Omit<WhatIf, "topComment">[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

interface FirstRepliesApiResponse {
  status: boolean;
  data: {
    firstReplies: Record<
      string,
      {
        _id: string;
        content: string;
      } | null
    >;
  };
}

const useWhatIfs = () => {
  const [posts, setPosts] = useState<WhatIf[]>([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const fetchFirstReplies = async (postIds: string[]) => {
    if (postIds.length === 0) return;

    try {
      const response = await fetch(
        `/api/what-if/first-replies?ids=${postIds.join(",")}`,
      );

      const result: FirstRepliesApiResponse = await response.json();

      if (!response.ok || !result.status) {
        throw new Error("Failed to fetch first replies");
      }

      const firstReplies = result.data.firstReplies;

      setPosts((prev) =>
        prev.map((post) => ({
          ...post,
          topComment: firstReplies[post._id]?.content ?? null,
          firstReplyLoading: false,
        })),
      );
    } catch (error) {
      console.error("Failed to fetch first replies:", error);
    }
  };

  const fetchPosts = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      // 1. Fetch posts
      const response = await fetch("/api/what-if");

      const result: PostsApiResponse = await response.json();

      if (!response.ok || !result.status) {
        throw new Error("Failed to fetch What Ifs");
      }

      const fetchedPosts = result.data.posts;

      // 2. Render posts immediately
      setPosts(
        fetchedPosts.map((post) => ({
          ...post,
          topComment: null,
          firstReplyLoading: true,
        })),
      );

      // 3. Fetch first replies AFTER posts are rendered
      const postIds = fetchedPosts.map((post) => post._id);

      fetchFirstReplies(postIds);
    } catch (error) {
      console.error("Failed to fetch What Ifs:", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const createWhatIf = useCallback(
    async (content: string) => {
      if (!content.trim() || posting) return false;

      try {
        setPosting(true);

        const response = await fetch("/api/what-if", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.status) {
          throw new Error(result.msg || "Failed to post What If");
        }

        const newPost: WhatIf = {
          ...result.data,
          topComment: null,
          firstReplyLoading: true,
        };
        setPosts((prev) => [newPost, ...prev]);

        // Fetch first reply for the newly created post
        fetchFirstReplies([newPost._id]);

        toast.success("Your What If escaped! 💥");

        return true;
      } catch (error) {
        console.error("Failed to submit What If:", error);

        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );

        return false;
      } finally {
        setPosting(false);
      }
    },
    [posting],
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    posting,
    fetchPosts,
    createWhatIf,
  };
};

export default useWhatIfs;
