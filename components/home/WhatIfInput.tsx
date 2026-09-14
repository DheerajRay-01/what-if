"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function WhatIfInput() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const trimmedContent = content.trim();
    const finalContent = `What if ${trimmedContent.replace(/[?]+$/, "")}?`;

    if (!trimmedContent || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/what-if", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: finalContent,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.msg || "Failed to post What If");
      }

      setContent("");

      toast.success("Your What If escaped! 💥");
    } catch (error) {
      console.error("Failed to submit What If:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Input */}
      <div
        className="
          relative flex min-h-24 w-full items-start
          border-2 border-foreground
          bg-background
          px-4 py-4
          shadow-[4px_4px_0px_0px_currentColor]
          transition-all
          focus-within:-translate-x-0.5
          focus-within:-translate-y-0.5
          focus-within:shadow-[6px_6px_0px_0px_currentColor]
          sm:min-h-28 sm:px-5 sm:py-5
        "
      >
        {/* Small doodle */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-2 -bottom-2
            h-4 w-8
            rotate-[8deg]
            border-b-2
            border-dashed
            border-foreground
          "
        />

        <span className="shrink-0 text-base font-bold sm:text-lg">
          What if
        </span>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          placeholder="your thought..."
          maxLength={500}
          disabled={loading}
          className="
            min-w-0 flex-1
            bg-transparent
            px-2
            text-base
            font-medium
            outline-none
            placeholder:text-muted-foreground
            disabled:opacity-50
            sm:px-3
            sm:text-lg
          "
        />

        {/* <span className="shrink-0 text-base font-bold sm:text-lg">
          ?
        </span> */}
         <Image
                  src="/emojis/question.svg"
                  alt=""
                  width={45}
                  height={45}
                  className="transition-transform group-hover:rotate-12"
                />

        {/* Character count */}
        <span
          className="
            absolute bottom-3 right-4
            text-xs font-medium
            text-muted-foreground
          "
        >
          {content.length}/500
        </span>
      </div>

      {/* Submit */}
      <div className="mt-5 flex justify-center">
        

        <button
          type="button"
          onClick={submit}
          disabled={!content.trim() || loading}
          className="
            group flex w-full items-center justify-center gap-2
            border-2 border-foreground
            bg-foreground
            px-5 py-2
            text-sm font-black
            text-background
            shadow-[4px_4px_0px_0px_currentColor]
            transition-all
            hover:-translate-x-0.5
            hover:-translate-y-0.5
            hover:shadow-[6px_6px_0px_0px_currentColor]
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:translate-x-0
            disabled:hover:translate-y-0
            sm:w-auto
            sm:px-7
            sm:py-3.5
            sm:text-base
          "
        >
          {loading ? (
            "THROWING..."
          ) : (
            <>
               <Image
                  src="/emojis/wastebasket.svg"
                  alt=""
                  width={25}
                  height={25}
                  className="transition-transform group-hover:rotate-12"
                />

              THROW IT OUT THERE

              <ArrowUpRight
                size={18}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />

              
            </>
          )}
        </button>
      </div>
    </div>
  );
}