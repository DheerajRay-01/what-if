"use client";

import { useRef, useState } from "react";
import {
  Check,
  Link2,
  MoreHorizontal,
  Share2,
  X,
} from "lucide-react";
import { toBlob } from "html-to-image";

import {
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoReddit } from "react-icons/io5";

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
  const [showMore, setShowMore] = useState(false);
  const [sharingImage, setSharingImage] = useState(false);

  /* ----------------------------- */
  /* Share URL */
  /* ----------------------------- */

  const getShareUrl = () => window.location.href;

  /* ----------------------------- */
  /* Copy Link */
  /* ----------------------------- */

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

  /* ----------------------------- */
  /* Social Sharing */
  /* ----------------------------- */

  const shareWhatsApp = () => {
    const url = getShareUrl();

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `${content}\n\n${url}`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareX = () => {
    const url = getShareUrl();

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        content
      )}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=500"
    );
  };

  const shareReddit = () => {
    const url = getShareUrl();

    window.open(
      `https://www.reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(content)}`,
      "_blank",
      "noopener,noreferrer,width=900,height=700"
    );
  };

  const shareLinkedIn = () => {
    const url = getShareUrl();

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank",
      "noopener,noreferrer,width=900,height=700"
    );
  };

  const shareTelegram = () => {
    const url = getShareUrl();

    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(content)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ----------------------------- */
  /* Share Image */
  /* ----------------------------- */

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

      if (!navigator.share) {
        alert("Image sharing is not supported on this browser.");
        return;
      }

      if (!navigator.canShare?.({ files: [file] })) {
        alert("Image sharing is not supported on this device.");
        return;
      }

    const url = `${process.env.NEXT_PUBLIC_APP_URL}/what-ifs/${id}`;

await navigator.share({
  title: "What If…?",
  text: `${content}\n\n${url}`,
  files: [file],
});
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

  /* ----------------------------- */
  /* Close */
  /* ----------------------------- */

  const closeModal = () => {
    setOpen(false);
    setShowMore(false);
    setCopied(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          setShowMore(false);
          setCopied(false);
        }
      }}
    >
      {/* Trigger */}
      <DialogTrigger >
        <Button
          type="button"
          variant="ghost"
          className="
            h-auto
            rounded-none
            border-0
            px-0
            font-black
            uppercase
            hover:bg-transparent
          "
        >
          <Share2 className="mr-2 size-4" />
          SPREAD CHAOS
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-md
          rounded-none
          border-2
          border-black
          bg-[#fffdf5]
          p-5
          shadow-[7px_7px_0_#000]
        "
      >
        {/* Header */}
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-black tracking-tight">
            Share this What If
          </DialogTitle>
        </DialogHeader>

        {/* Share Card */}
        <div
          ref={shareCardRef}
          className="
            border-2
            border-black
            bg-white
            p-3
          "
        >
          <p className="text-xs font-black uppercase">
            WHAT IF…?
          </p>

          <p className="mt-3 line-clamp-3 text-base font-bold leading-snug">
            {content}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold">
            <span>😂 {reactionCounts.funny}</span>
            <span>👀 {reactionCounts.interesting}</span>
            <span>🤯 {reactionCounts.crazy}</span>
            <span>🚀 {reactionCounts.build}</span>
            <span>💬 {replyCount}</span>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <span className="text-[10px] font-bold text-black/50">
              whatiff.vercel.app
            </span>

            <span className="block h-[3px] w-14 rotate-[-4deg] bg-black" />
          </div>
        </div>

        {/* Social Actions */}
        <div className="mt-5">
          <div className="grid grid-cols-5 gap-2">
            <ShareAction
              label={copied ? "Copied" : "Copy Link"}
              onClick={copyLink}
              active={copied}
            >
              {copied ? (
                <Check className="size-5" />
              ) : (
                <Link2 className="size-5" />
              )}
            </ShareAction>

            <ShareAction
              label="WhatsApp"
              onClick={shareWhatsApp}
              className="bg-[#25D366]"
            >
              <FaWhatsapp color="black" className="size-5 text-white" />
            </ShareAction>

            <ShareAction
              label="X"
              onClick={shareX}
              className="bg-black"
            >
              <FaXTwitter color="black" className="size-5 text-white" />
            </ShareAction>

            <ShareAction
              label="Reddit"
              onClick={shareReddit}
              className="bg-[#ff4500]"
            >
              <IoLogoReddit color="black" className="size-6 text-white" />
            </ShareAction>

            <ShareAction
              label="More"
              onClick={() => setShowMore((prev) => !prev)}
              active={showMore}
            >
              <MoreHorizontal className="size-5" />
            </ShareAction>
          </div>
        </div>

        {/* More Options */}
        {showMore && (
          <div
            className="
              mt-3
              grid
              grid-cols-2
              gap-2
              animate-in
              slide-in-from-top-2
              fade-in
              duration-150
            "
          >
            <Button
              type="button"
              onClick={shareLinkedIn}
              className="
                h-11
                rounded-none
                border-2
                border-black
                bg-white
                font-black
                text-black
                shadow-[3px_3px_0_#000]
                hover:bg-white
              "
            >
              <FaLinkedin className="mr-2 size-5" />
              LinkedIn
            </Button>

            <Button
              type="button"
              onClick={shareTelegram}
              className="
                h-11
                rounded-none
                border-2
                border-black
                bg-white
                font-black
                text-black
                shadow-[3px_3px_0_#000]
                hover:bg-white
              "
            >
              <FaTelegram className="mr-2 size-5" />
              Telegram
            </Button>
          </div>
        )}

        {/* Share Image */}
        <Button
          type="button"
          onClick={shareImage}
          disabled={sharingImage}
          className="
            mt-4
            h-11
            w-full
            rounded-none
            border-2
            border-black
            bg-black
            font-black
            uppercase
            text-white
            shadow-[3px_3px_0_#000]
            hover:bg-black
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Share2 className="mr-2 size-4" />

          {sharingImage
            ? "CREATING IMAGE..."
            : "SHARE IMAGE"}
        </Button>

        {/* Close */}
        <button
          type="button"
          onClick={closeModal}
          className="
            absolute
            right-4
            top-4
            flex
            size-7
            items-center
            justify-center
            border-2
            border-transparent
            hover:border-black
          "
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}

/* ================================= */
/* Share Action */
/* ================================= */

interface ShareActionProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

function ShareAction({
  label,
  onClick,
  children,
  className = "",
  active = false,
}: ShareActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        min-w-0
        flex-col
        items-center
        gap-1.5
      "
    >
      <span
        className={`
          flex
          size-10
          items-center
          justify-center
          rounded-full
          border-2
          border-black
          bg-white
          text-black
          transition-transform
          group-hover:-translate-y-0.5
          ${active ? "shadow-[2px_2px_0_#000]" : ""}
          ${className}
        `}
      >
        {children}
      </span>

      <span
        className="
          max-w-full
          truncate
          text-[10px]
          font-bold
          leading-none
        "
      >
        {label}
      </span>
    </button>
  );
}