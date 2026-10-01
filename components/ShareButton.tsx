"use client";

import { useRef, useState } from "react";
import {
  Check,
  Link2,
  Share2,
  X,
} from "lucide-react";
import { toBlob } from "html-to-image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  id: string;
  content: string;
  reactionCounts: {
    funny: number;
    interesting: number;
    crazy: number;
    build: number;
  };
  replyCount: number;
}

export default function ShareButton({
  id,
  content,
  reactionCounts,
  replyCount,
}: ShareButtonProps) {
  const shareCardRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharingImage, setSharingImage] = useState(false);

  /* -------------------------------- */
  /* Share URL                         */
  /* -------------------------------- */

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }

    return `${process.env.NEXT_PUBLIC_APP_URL}/what-ifs/${id}`;
  };

  /* -------------------------------- */
  /* Copy Link                         */
  /* -------------------------------- */

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  /* -------------------------------- */
  /* Share Image                       */
  /* -------------------------------- */

  const shareImage = async () => {
    if (!shareCardRef.current || sharingImage) return;

    try {
      setSharingImage(true);

      const blob = await toBlob(shareCardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      if (!blob) {
        throw new Error("Failed to generate image");
      }

      const file = new File([blob], "what-if.png", {
        type: "image/png",
      });

      const url = `${process.env.NEXT_PUBLIC_APP_URL}/what-ifs/${id}`;

      /* Native share */

      if (
        navigator.share &&
        navigator.canShare?.({
          files: [file],
        })
      ) {
        await navigator.share({
          title: "What If…?",
          text: `${content}\n\n${url}`,
          files: [file],
        });

        return;
      }

      /* Browser fallback */

      const imageUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = imageUrl;
      link.download = "what-if.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error("Failed to share image:", error);
    } finally {
      setSharingImage(false);
    }
  };

  /* -------------------------------- */
  /* Dialog                            */
  /* -------------------------------- */

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      setCopied(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      {/* Trigger */}

  <DialogTrigger
  type="button"
  className="
    inline-flex
    h-auto
    items-center
    rounded-none
    border-0
    bg-transparent
    p-0
    font-black
    uppercase
    text-black
    shadow-none
    outline-none
    hover:bg-transparent
    focus-visible:ring-2
    focus-visible:ring-black
    focus-visible:ring-offset-2
  "
>
  <Share2 className="mr-2 size-4" />
  SPREAD CHAOS
</DialogTrigger>

      {/* Modal */}

      <DialogContent
        className="
          w-[calc(100%-1.5rem)]
          max-w-lg
          rounded-2xl
          border-2
          border-black
          bg-[#fffdf5]
          p-0
          shadow-[7px_7px_0_#000]
        "
      >
        <div className="relative px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7">

          {/* Close */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="
              absolute
              right-4
              top-4
              z-10
              flex
              size-8
              items-center
              justify-center
              border-2
              border-transparent
              transition-transform
              hover:-rotate-6
              hover:border-black
            "
          >
            <X className="size-5" />
          </button>

          {/* Header */}

          <DialogHeader className="pr-10 text-left">
            <DialogTitle
              className="
                text-3xl
                font-black
                leading-none
                tracking-[-0.04em]
              "
            >
              Share this What If
            </DialogTitle>

            <div className="mt-2 flex items-center gap-3">
              <span
                className="
                  h-1.5
                  w-24
                  -rotate-1
                  rounded-full
                  bg-yellow-300
                "
              />

              <span
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-wide
                  text-black/50
                "
              >
                Spread the chaos
              </span>
            </div>
          </DialogHeader>

          {/* -------------------------------- */}
          {/* What If Preview                   */}
          {/* -------------------------------- */}

          <div className="relative mx-1 mt-6">

            {/* Yellow offset */}

            <div
              className="
                absolute
                inset-0
                translate-x-1.5
                translate-y-1.5
                rotate-[1deg]
                border-2
                border-black
                bg-yellow-300
              "
            />

            {/* Actual card */}

            <div
              ref={shareCardRef}
              className="
                relative
                rotate-[-0.7deg]
                border-2
                border-black
                bg-white
                p-4
                shadow-[3px_3px_0_#000]
              "
            >
              {/* Label */}

              <p
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-wide
                "
              >
                WHAT IF…?
              </p>

              {/* Content */}

              <p
                className="
                  mt-3
                  line-clamp-3
                  text-base
                  font-black
                  leading-[1.25]
                  tracking-[-0.015em]
                "
              >
                {content}
              </p>

              {/* Reactions */}

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-1.5
                  text-[11px]
                  font-bold
                "
              >
                <span>
                  😂 {reactionCounts.funny}
                </span>

                <span>
                  👀 {reactionCounts.interesting}
                </span>

                <span>
                  🤯 {reactionCounts.crazy}
                </span>

                <span>
                  🚀 {reactionCounts.build}
                </span>

                <span>
                  💬 {replyCount}
                </span>
              </div>

              {/* Footer */}

              <div
                className="
                  mt-4
                  flex
                  items-end
                  justify-between
                "
              >
                <span
                  className="
                    text-[9px]
                    font-bold
                    text-black/45
                  "
                >
                  whatiff.vercel.app
                </span>

                <span
                  className="
                    block
                    h-[3px]
                    w-12
                    rotate-[-5deg]
                    bg-black
                  "
                />
              </div>
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Actions                           */}
          {/* -------------------------------- */}

          <div
            className="
              mt-7
              grid
              grid-cols-2
              gap-3
            "
          >
            {/* Copy */}

            <Button
              type="button"
              onClick={copyLink}
              className="
                h-12
                rounded-xl
                border-2
                border-black
                bg-white
                text-sm
                font-black
                text-black
                shadow-[3px_3px_0_#000]
                transition-all
                hover:bg-white
                active:translate-x-1
                active:translate-y-1
                active:shadow-none
              "
            >
              {copied ? (
                <>
                  <Check className="mr-2 size-4" />
                  COPIED
                </>
              ) : (
                <>
                  <Link2 className="mr-2 size-4" />
                  COPY LINK
                </>
              )}
            </Button>

            {/* Share */}

            <Button
              type="button"
              onClick={shareImage}
              disabled={sharingImage}
              className="
                h-12
                rounded-xl
                border-2
                border-black
                bg-yellow-300
                text-sm
                font-black
                text-black
                shadow-[3px_3px_0_#000]
                transition-all
                hover:bg-yellow-300
                active:translate-x-1
                active:translate-y-1
                active:shadow-none
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Share2 className="mr-2 size-4" />

              {sharingImage
                ? "CREATING..."
                : "SHARE"}
            </Button>
          </div>

          {/* Small footer */}

          <p
            className="
              mt-4
              text-center
              text-[10px]
              font-bold
              text-black/35
            "
          >
            Throw it out there. 💥
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}