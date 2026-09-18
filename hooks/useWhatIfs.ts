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

  featuredReply: {
    _id: string;
    content: string;
  } | null;
}

interface PostsApiResponse {
  status: boolean;
  data: {
    posts: WhatIf[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

const useWhatIfs = () => {
  const [posts, setPosts] = useState<WhatIf[]>([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const fetchPosts = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      //  await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch("/api/what-if");

      const result: PostsApiResponse = await response.json();

      console.log(result);
      

      if (!response.ok || !result.status) {
        throw new Error("Failed to fetch What Ifs");
      }

      setPosts(result.data.posts);
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

        console.log("result***********:",result);
        

        if (!response.ok || !result.status) {
          throw new Error(
            result.msg || "Failed to post What If"
          );
        }

        const newPost: WhatIf = {
          ...result.data,
          featuredReply: null,
        };

        setPosts((prev) => [newPost, ...prev]);

        toast.success("Your What If escaped! 💥");

        return true;
      } catch (error) {
        console.error("Failed to submit What If:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong"
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