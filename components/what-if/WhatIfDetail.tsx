"use client";

import { MessageCircle, Share2 } from "lucide-react";
import ReactionBar from "./ReactionBar";
import Image from "next/image";
import ShareButton from "../ShareButton";
import Link from "next/link";

interface WhatIfDetailProps {
  whatIf: {
    _id: string;
    postId:string;
    authorId: {
      displayName: string;
      publicId: string;
    } | null;
    content: string;
    reactionCounts: {
      funny: number;
      interesting: number;
      crazy: number;
      build: number;
    };
    replyCount: number;
  };
}

const WhatIfDetail = ({ whatIf }: WhatIfDetailProps) => {
  return (
    <article className="relative mx-auto w-full max-w-2xl border-2 border-black bg-[#fffdf5] px-6 py-6 shadow-[6px_6px_0_#000] md:px-8 md:py-8">
      {/* Top hand-drawn mark */}
      <div
        aria-hidden="true"
        className="absolute -right-1 -top-3 w-10 rotate-[-7deg] border-t-2 border-dashed border-black"
      />

      {/* What If */}
      <h1 className="text-3xl font-bold leading-[1.1] tracking-tight md:text-[38px]">
        {whatIf.content}
      </h1>

      {whatIf.authorId && (
  <div className="mt-3 flex justify-end">
    <Link
      href={`/what-ifs?author=${whatIf.authorId.publicId}`}
      className="
        text-sm font-bold
        text-foreground
        underline decoration-dashed
        underline-offset-4
        transition-transform
        hover:-rotate-1
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-foreground
        focus-visible:ring-offset-2
      "
    >
      @{whatIf.authorId.displayName}
      <span className="ml-1 text-muted-foreground">↗</span>
    </Link>
  </div>
)}

      {/* Divider */}
      <div className="my-6 border-t-2 border-dashed border-black/25" />

      {/* Reactions */}
      <ReactionBar
        reactionCounts={whatIf.reactionCounts}
        whatIfId={whatIf._id}
      />

      {/* Bottom meta */}
      <div className="mt-6 flex items-center justify-between border-t-2 border-black/15 pt-4">
        {/* Replies */}
        <div className="flex items-center gap-2 text-sm font-bold uppercase">
          
          
          <span>
              <Image
                src="/emojis/comment.svg"
                className="inline"
                alt=""
                width={33}
                height={33}
            />
            {whatIf.replyCount}{" "}
            {whatIf.replyCount === 1 ? "REPLY" : "REPLIES"}
          </span>
        </div>

        {/* Share */}
        {/* <button
          type="button"
          className="group flex items-center gap-2 text-sm font-bold uppercase transition-transform hover:-translate-y-0.5"
        >
          <Share2
            size={17}
            strokeWidth={2.5}
            className="transition-transform group-hover:rotate-6"
          />
          <span>SPREAD CHAOS</span>
        </button> */}
        <ShareButton content={whatIf.content} replyCount={whatIf.replyCount} reactionCounts={whatIf.reactionCounts} id={whatIf._id}/>
      </div>

      {/* Bottom hand-drawn mark */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 -left-1 w-7 rotate-[8deg] border-t-2 border-dashed border-black"
      />
    </article>
  );
};

export default WhatIfDetail;