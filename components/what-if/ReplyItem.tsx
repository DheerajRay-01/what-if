"use client";

import { CornerDownRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Level1Reply,
  Level2Reply,
} from "@/types/reply";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReplyItemProps {
  reply: Level1Reply;
  whatIfId: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ReplyItem = ({
  reply,
  whatIfId,
  isOpen,
  onToggle,
}: ReplyItemProps) => {
  const [childReplies, setChildReplies] =
    useState<Level2Reply[]>([]);

  const [childReplyCount, setChildReplyCount] =
    useState(reply.replyCount);

  const [nextCursor, setNextCursor] =
    useState<string | null>(null);

  const [hasMoreChildren, setHasMoreChildren] =
    useState(false);

  const [loadingChildren, setLoadingChildren] =
    useState(false);

  const [loadingMoreChildren, setLoadingMoreChildren] =
    useState(false);

  const [postingChild, setPostingChild] =
    useState(false);

  const [content, setContent] = useState("");

  const childLoadMoreRef =
    useRef<HTMLDivElement | null>(null);

  const maxLength = 280;

  const hasChildren = childReplyCount > 0;

  /*
   * FETCH LEVEL 2
   */

  const fetchChildren = useCallback(
    async (cursor: string | null = null) => {
      try {
        if (cursor) {
          setLoadingMoreChildren(true);
        } else {
          setLoadingChildren(true);
        }

        const url = new URL(
          `/api/what-if/${whatIfId}/replies/${reply._id}`,
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
          setChildReplies((prev) => [
            ...prev,
            ...data.replies,
          ]);
        } else {
          setChildReplies(data.replies);
        }

        setNextCursor(data.nextCursor);
        setHasMoreChildren(data.hasMore);

        if (
          typeof data.totalReplies === "number"
        ) {
          setChildReplyCount(data.totalReplies);
        }
      } catch (error) {
        console.error(
          "Failed to fetch child replies:",
          error
        );
      } finally {
        setLoadingChildren(false);
        setLoadingMoreChildren(false);
      }
    },
    [whatIfId, reply._id]
  );

  /*
   * TOGGLE
   */

  const handleToggle = async () => {
    onToggle();

    // Closing
    if (isOpen) {
      return;
    }

    // No children
    if (!hasChildren) {
      return;
    }

    // Already loaded
    if (childReplies.length > 0) {
      return;
    }

    await fetchChildren();
  };

  /*
   * CREATE LEVEL 2 REPLY
   */

  const handleCreateChildReply = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent || postingChild) {
      return;
    }

    try {
      setPostingChild(true);

      const response = await fetch(
        `/api/what-if/${whatIfId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: trimmedContent,
            parentId: reply._id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(
          result.msg || "Failed to post reply"
        );
      }

      const newReply =
        result.data as Level2Reply;

      // Immediately show new reply
      setChildReplies((prev) => [
        ...prev,
        newReply,
      ]);

      // Immediately update count
      setChildReplyCount((prev) => prev + 1);

      // Clear input
      setContent("");

      toast.success(
        "Your nonsense escaped! 💥"
      );
    } catch (error) {
      console.error(
        "Failed to create child reply:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setPostingChild(false);
    }
  };

  /*
   * CHILD INFINITE SCROLL
   */

  useEffect(() => {
    const element = childLoadMoreRef.current;

    if (
      !element ||
      !isOpen ||
      !hasMoreChildren
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          nextCursor &&
          !loadingMoreChildren
        ) {
          fetchChildren(nextCursor);
        }
      },
      {
        rootMargin: "150px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    isOpen,
    hasMoreChildren,
    nextCursor,
    loadingMoreChildren,
    fetchChildren,
  ]);

  return (
    <div className="relative">
      {/* CLOSED STATE */}

      {hasChildren && !isOpen && (
        <>
          {childReplyCount >= 3 && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-full translate-x-3 translate-y-3 border-2 border-black bg-[#fffdf5]"
            />
          )}

          {childReplyCount >= 2 && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-full translate-x-2 translate-y-2 border-2 border-black bg-[#fffdf5]"
            />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-full translate-x-1 translate-y-1 border-2 border-black bg-[#fffdf5]"
          />
        </>
      )}

      {/* LEVEL 1 */}

      <article className="relative z-10 border-2 border-black bg-[#fffdf5] shadow-[4px_4px_0_#000]">
        <div className="px-4 py-3.5 md:px-5 md:py-4">
          <p className="text-[15px] font-medium leading-snug md:text-base">
            {reply.content}
          </p>

          <button
            type="button"
            onClick={handleToggle}
            disabled={loadingChildren}
            className="mt-3 flex items-center gap-1 text-xs font-black uppercase outline-none transition-transform hover:translate-x-0.5 disabled:opacity-50"
          >
            <CornerDownRight
              size={14}
              strokeWidth={2.5}
            />

            {isOpen ? (
              <span>❌ NOPE</span>
            ) : hasChildren ? (
              <>
                <Image
                  src="/emojis/brain.svg"
                  alt=""
                  width={22}
                  height={22}
                />

                <span>
                  {childReplyCount} UNNECESSARY OPINIONS
                </span>
              </>
            ) : (
              <>
                <Image
                  src="/emojis/skull.svg"
                  alt=""
                  width={22}
                  height={22}
                />

                <span>MAKE IT WORSE</span>
              </>
            )}
          </button>
        </div>
      </article>

      {/* LEVEL 2 INPUT */}

      {isOpen && (
        <div className="mt-3 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="border-2 border-black bg-[#fffdf5] shadow-[3px_3px_0_#000]">
            <div className="flex items-end gap-2 p-2">
              <Textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleCreateChildReply();
                  }
                }}
                maxLength={maxLength}
                placeholder="Drop your terrible idea here..."
                disabled={postingChild}
                className="min-h-[42px] flex-1 resize-none rounded-none border-0 bg-transparent px-2 py-1.5 text-sm font-medium leading-snug shadow-none focus-visible:ring-0 disabled:opacity-50"
                rows={1}
              />

              <Button
                type="button"
                onClick={handleCreateChildReply}
                disabled={
                  !content.trim() ||
                  postingChild
                }
                className="h-8 shrink-0 rounded-none bg-black px-3 text-[11px] font-black uppercase text-white hover:bg-black/80 disabled:opacity-30"
              >
                {postingChild ? (
                  "POSTING..."
                ) : (
                  <>
                    MAKE IT WORSE
                    <ArrowUpRight
                      size={13}
                      strokeWidth={2.5}
                    />
                  </>
                )}
              </Button>
            </div>

            {content.length >= 240 && (
              <div className="px-3 pb-1.5 text-right">
                <span className="text-[10px] font-bold text-black/40">
                  {content.length}/{maxLength}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEVEL 2 REPLIES */}

      {isOpen && hasChildren && (
        <div className="relative ml-5 mt-4 space-y-3 border-l-2 border-dashed border-black/30 pl-4 animate-in slide-in-from-top-2 fade-in duration-200 md:ml-8 md:pl-5">
          {loadingChildren ? (
            <div className="py-2 text-xs font-bold uppercase text-black/40">
              LOADING DAMAGE...
            </div>
          ) : (
            <>
              {childReplies.map((childReply) => (
                <article
                  key={childReply._id}
                  className="border-2 border-black bg-[#fffdf5] px-4 py-3 shadow-[3px_3px_0_#000]"
                >
                  <p className="text-sm font-medium leading-snug md:text-[15px]">
                    {childReply.content}
                  </p>
                </article>
              ))}

              {hasMoreChildren && (
                <div
                  ref={childLoadMoreRef}
                  className="flex min-h-12 items-center justify-center"
                >
                  {loadingMoreChildren && (
                    <span className="text-[10px] font-black uppercase text-black/40">
                      MORE DAMAGE...
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplyItem;